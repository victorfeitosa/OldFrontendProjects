function getNumDaysInMonth(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth(), 0).getDate()
}

function validDay(day, now) {
  return day.getMonth() === now.getMonth() && day.getDate() >= now.getDate()
}

//#region CRUD methods for the appointment on localStorage
function getAppointmentKey(date) {
  return `appointment-${date.getFullYear()}-${date.getMonth()}`
}

function getMonthAppointments(date) {
  return JSON.parse(localStorage.getItem(getAppointmentKey(date))) || []
}

function getAppointment(date = new Date()) {
  if (!getMonthAppointments(date)) {
    return null
  }
  return getMonthAppointments(date)[date.getDate() - 1]
}

function setAppointment(date = new Date(), appointment) {
  const key = getAppointmentKey(date)
  const day = date.getDate()
  let monthAppointments = getMonthAppointments(date)
  monthAppointments[day - 1] = appointment
  localStorage.setItem(key, JSON.stringify(monthAppointments))
}

function deleteAppointment(date) {
  setAppointment(date, null)
}

//#endregion

//#region House keeping methods for dialogs
function updateAppointments(now) {
  updateAppointmentsSummary(now)
  updateAppointmentDays(now)
}
function updateAppointmentsSummary(now) {
  const summary = calendar.getElementsByClassName('summary__text')[0]
  const appointments = getMonthAppointments(now)
  const numOfAppointments = appointments.reduce((ac, appointment) => {
    if (appointment != null) {
      return ++ac
    }
    return ac
  }, 0)

  summary.textContent = `${numOfAppointments} appointment${
    numOfAppointments !== 1 ? 's' : ''
  } scheduled this month`
}

function updateAppointmentDays(now = new Date()) {
  const days = document.getElementById('calendar').querySelectorAll('.weeks .week .day:not(.day--past)')
  const year = now.getFullYear()
  const month = now.getMonth()
  for (const day of days) {
    if(getAppointment(new Date(year, month, day.textContent))) {
      day.classList.add('day--appointment')
    } else {
      day.classList.remove('day--appointment')
    }
  }
}
//#endregion

//#region Appointment tooltip methods
function getAppointmentToolTip() {
  if (!window.appointmentToolTip) {
    window.appointmentToolTip = document.createElement('div')
    window.appointmentToolTip.className = 'appointment-tooltip'
    window.appointmentToolTip.addEventListener('transitionend', e => {
      e.preventDefault()
      if (
        e.srcElement.className ===
          'appointment-tooltip appointment-tooltip--closing'
      ) {
        document.body.removeChild(window.appointmentToolTip)
      }
    })
  }

  return window.appointmentToolTip
}

function openAppointmentToolTip(date) {
  if (!getAppointment(date)) {
    openAppointmentToolTipNew(date)
  } else {
    openAppointmentToolTipDelete(date)
  }
}

function openAppointmentToolTipNew(date) {
  const tip = getAppointmentToolTip()
  tip.innerHTML = `
    <h2 class="header">Create a new appointment for <span class="day"></span>?</h2>
    <div class="footer"><button class="btn btn--cancel btn--tooltip">No</button><button class="btn btn--ok btn--tooltip">Yes</button></div>
    `
  const day = tip.getElementsByClassName('day')[0]
  day.textContent = date.toLocaleDateString()
  tip.classList.remove('appointment-tooltip--closing')

  tip.querySelector('button.btn--ok').onclick = () => {
    closeappointmentToolTip()
    openAppointmentDialog(date)
  }

  tip.querySelector('button.btn--cancel').onclick = () => {
    closeappointmentToolTip()
  }

  document.body.appendChild(tip)
}

function openAppointmentToolTipDelete(date) {
  const tip = getAppointmentToolTip()
  tip.innerHTML = `
    <h2 class="header">There's already an appointment for <span class="day"></span>, What would you like to do?</h2>
    <div class="footer"><button class="btn btn--cancel">Cancel</button>
    <button class="btn btn--edit">Edit</button>
    <button class="btn btn--delete">Delete</button>
    </div>
    `

  const day = tip.getElementsByClassName('day')[0]
  day.textContent = date.toLocaleDateString()
  tip.classList.remove('appointment-tooltip--closing')

  tip.querySelector('button.btn--delete').onclick = () => {
    closeappointmentToolTip()
    deleteAppointment(date)
    updateAppointments(date)
  }
  tip.querySelector('button.btn--edit').onclick = () => {
    closeappointmentToolTip()
    openAppointmentDialog(date)
  }

  tip.querySelector('button.btn--cancel').onclick = () => {
    closeappointmentToolTip()
  }

  document.body.appendChild(tip)
}

function closeappointmentToolTip() {
  const tip = getAppointmentToolTip()
  tip.classList.add('appointment-tooltip--closing')
}

// Creates appointment dialog
function getAppointmentDialog() {
  if (!window.appointmentDialog) {
    const appointmentDOM = `
    <div class="container">
      <div class="title">appointment Dialog for:<span class="title__day" id="day"></span></div>
      <div class="body">
        <h2 class="body__header">Appointment time:</h2>
        <input type="time" min="0" max="12" class="body__time"></input>
        <h2 class="body__header">Notes:</h2>
        <textarea placeholder="Click here..." rows="2" class="body__text"></textarea>
      </div>
      <div class="footer">
        <button class="btn btn--ok">OK</button>
        <button class="btn btn--cancel">Cancel</button>
      </div>
    </div>`
    window.appointmentDialog = document.createElement('div')
    window.appointmentDialog.className = 'appointment-dialog'
    window.appointmentDialog.innerHTML = appointmentDOM
    window.appointmentDialog.addEventListener('transitionend', e => {
      e.preventDefault()
      if (
        e.srcElement.className ===
        'appointment-dialog appointment-dialog--closing'
      ) {
        appointmentDialog.getElementsByClassName('body__time')[0].value = null
        appointmentDialog.getElementsByClassName('body__text')[0].value = ''
        document.body.removeChild(window.appointmentDialog)
      }
    })
  }

  return window.appointmentDialog
}

function openAppointmentDialog(date) {
  const dialog = getAppointmentDialog(date)
  const day = date.toLocaleDateString()
  dialog.classList.remove('appointment-dialog--closing')
  dialog.querySelector('#day').textContent = day

  const appointment = getAppointment(date)
  if (appointment) {
    dialog.getElementsByClassName('body__time')[0].value = appointment.time
    dialog.getElementsByClassName('body__text')[0].value = appointment.notes
  }

  dialog.querySelector('button.btn--ok').onclick = () => {
    const appointment = {
      time: dialog.getElementsByClassName('body__time')[0].value,
      notes: dialog.getElementsByClassName('body__text')[0].value
    }
    setAppointment(date, appointment)
    updateAppointments(date)
    closeappointmentDialog()
  }
  dialog.querySelector('button.btn--cancel').onclick = () => {
    closeappointmentDialog()
  }

  document.body.appendChild(dialog)
}

function closeappointmentDialog() {
  const dialog = getAppointmentDialog()
  dialog.classList.add('appointment-dialog--closing')
}

// Creates a day container
function createDayDOM(dayDate, now = new Date(), onClick = null) {
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()

  const yearNum = dayDate.getFullYear()
  const monthNum = dayDate.getMonth() + 1
  const dayNum = dayDate.getDate()

  this.element = document.createElement('div')
  this.element.className = 'day'

  this.element.textContent = dayNum
  if (dayNum < currentDay || monthNum < currentMonth || yearNum < currentYear)
    this.element.classList.add('day--past')
  if (dayNum === currentDay) this.element.classList.add('day--today')

  this.element.addEventListener('click', () => {
    if (onClick && validDay(dayDate, now)) onClick(dayDate)
  })

  return this.element
}

// Creates a container with days
function createWeekDOM(startingDay, now = new Date(), onClick = null) {
  this.element = document.createElement('div')
  this.element.className = 'week'

  for (let i = 0; i < 7; i++) {
    let day = new Date(
      startingDay.getFullYear(),
      startingDay.getMonth(),
      startingDay.getDate() + i
    )
    this.element.appendChild(new createDayDOM(day, now, onClick))
  }

  return this.element
}

// Fill weeks container with week elements
function createMonthDOM(now, weeksContainer, onClick) {
  const firstDate = new Date(now.getFullYear(), now.getMonth(), 1)
  const weeks = []
  for (let i = 0; i < 31; i += 7) {
    const day = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      -firstDate.getDate() + i
    )
    weeks.push(new createWeekDOM(day, now, onClick))
  }
  for (const week of weeks) {
    weeksContainer.appendChild(week)
  }
}

function setupCalendar() {
  const now = new Date()
  let appointments = getMonthAppointments(now) || []
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  document.addEventListener('DOMContentLoaded', e => {
    const calendar = document.getElementById('calendar')
    const monthTitle = calendar.getElementsByClassName('month__title')[0]
    const now = new Date()

    monthTitle.textContent = months[now.getMonth()]
    const weeks = calendar.getElementsByClassName('weeks')[0]

    createMonthDOM(now, weeks, dayOfMonth => {
      openAppointmentToolTip(dayOfMonth)
    })

    updateAppointments(now)
  })
}

setupCalendar()
