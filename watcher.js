let daysOfWeek = [ "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
let currentdate = new Date(); 
let currentLesson = 0, pair = 0
let currentDayOfWeek = daysOfWeek[currentdate.getDay()]

/*
  DATA STRING BLOCK BEGIN
*/

let classSchedule = ["08:30", "09:15", "09:20", "10:05",
"10:15", "11:00", "11:05", "11:50",
"12:10", "12:55", "13:00", "13:45",
"14:00", "14:45", "14:50", "15:35",
"15:55", "16:40", "16:45", "17:30"]

let classScheduleExtended = [
    "1 пара, 1 половина",
    "перерыв 5 минут (пятиминутка) внутри 1 пары",
    "1 пара, 2 половина",
    "перерыв 10-20 минут между 1 и 2 парой",
    "2 пара, 1 половина",
    "перерыв 5 минут (пятиминутка) внутри 2 пары",
    "2 пара, 2 половина",
    "перерыв 10-20 минут между 2 и 3 парой",
    "3 пара, 1 половина",
    "перерыв 5 минут (пятиминутка) внутри 3 пары",
    "3 пара, 2 половина",
    "перерыв 10-20 минут между 3 и 4 парой",
    "4 пара, 1 половина",
    "перерыв 5 минут (пятиминутка) внутри 4 пары",
    "4 пара, 2 половина",
    "перерыв 10-20 минут между 4 и 5 парой",
    "5 пара, 1 половина",
    "перерыв 5 минут (пятиминутка) внутри 5 пары",
    "5 пара, 2 половина",
    "перерыв 10-20 минут между 5 и 6 парой"
]

let weekSchedule = [
    ["Нет занятия", "Нет занятия", "Нет занятия", "Нет занятия", "Нет занятия"],
    ["[ЭОС] +ФКиС", "[ЭОС] -История", "[ЭОС] +ОРГ -История", "Нет занятия", "Нет занятия"],
    ["Нет занятия", "История", "Англ яз", "Зар. литер", "ОРГ"],
    ["Нет занятия", "Англ яз пр.", "УНТ", "Проза (Редькин)", "УНТ #2"],
    ["ФКиС", "Нет занятия", "ФКиС ЭЛ", "-ФКиС 2", ""],
    ["-Русская орфография", "Русская орфография", "Зар. литер", "Литературоведение", "+ Литературоведение"],
    ["Нет занятия", "Нет занятия", "Нет занятия", "Нет занятия", "Нет занятия"]
]

/*
  DATA STRING BLOCK END
*/

function currentDay() {
  return "# Текущий день: " + currentdate.getDate() + "."
    + (currentdate.getMonth()+1)  + "." + currentdate.getFullYear() + ", " + currentDayOfWeek
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function currentTime() {
  return "# Текущее время: " + pad(currentdate.getHours(), 2) + ":" + pad(currentdate.getMinutes(), 2)
}

/*
  APP LOGIC BLOCK START
*/

function getCurrentLesson() {
  currentLesson = 0;
  
  for (let i = 0; i < classSchedule.length; i += 1) {
    let currentTimeSpan = (currentdate.getHours() * 60) + (currentdate.getMinutes())
    
    let pairHours = parseInt(classSchedule[i][0] + classSchedule[i][1])
    let pairMinutes = parseInt(classSchedule[i][3] + classSchedule[i][4])
    
    let lessonTimeSpan = (pairHours * 60) + (pairMinutes)
    
    if (currentTimeSpan < lessonTimeSpan) {
      break;
    }
    else {
      currentLesson += 1
    }
  }
  
//  debug lesson iterator
//  currentLesson = 4
  
  pair = parseInt((currentLesson / 4)) + 1;
}

function lessonDescription() {
  if (currentLesson < 1) {
    return "# Занятия ещё не начались, либо имеется ошибка часов"
  } else if (currentLesson >= 20) {
    return "# Занятия на сегодня, вероятно, уже завершились, так как время превышает " + classSchedule[19] +", либо имеется ошибка часов"
  } else {
    let line1 = "# В общем расписании: " + classScheduleExtended[currentLesson - 1] + " (" + classSchedule[currentLesson - 1] + "-" + classSchedule[currentLesson] + ")"
    let line2 = "# Относится к занятию: " + weekSchedule[currentdate.getDay()][pair - 1]
    return line1 + "<br>" + line2
  }
  return (currentLesson + " " + pair)
}

function nextLessonName() {
  let currentLessonsCount = weekSchedule[currentdate.getDay()].length
  
  if (pair < currentLessonsCount) {
    return "# Следующее занятие: " + (pair + 1) + " пара, " + weekSchedule[currentdate.getDay()][pair]
  } else {
    return "# Следующее занятие: Нет"
  }
  return "nextLessonName"
}

function nextDay() {
  let nextDayOfWeek = 0
  
  if (currentdate.getDay() == 6) {
    nextDayOfWeek = 0
  } else {
    nextDayOfWeek = currentdate.getDay() + 1
  }
  
  let line1 = "# Следующий день: " + daysOfWeek[nextDayOfWeek]
  
  let tasksExists = false
  
  let line2 = ""
  
  for (let counter = 0; counter < 5; counter += 1) {
    if(weekSchedule[nextDayOfWeek][counter] != "Нет занятия") {
      line2 = "# Вам на занятие: " + weekSchedule[nextDayOfWeek][counter] + ", это " + (counter+1) + " пара (к " + classSchedule[counter * 4] + "). "
      tasksExists = true
      break
    }
  }
  
  if (tasksExists == false) {
    line2 = "# Завтра занятий нет =)"
  }
  
  return line1 + "<br>" + line2
}

/*
  APP LOGIC BLOCK END
*/

function drawField() {
  let string1 = '#### Расписание ####'
  let string2 = currentDay()
  let string3 = currentTime()
  let string4 = '#### Текущее занятие ####'
  getCurrentLesson()
  let string5 = lessonDescription()
  let string6 = ''
  let string7 = '#### Следующее занятие ####'
  let string8 = nextLessonName()
  let string9 = '\n'
  let string10 = '#### Завтра ####'
  let string11 = nextDay()
  
  let result = string1 + '<br>' + string2 + '<br>' + string3 + '<br>' + string4 + '<br>' + string5 + '<br>' + string6 + string7 + '<br>' + string8 + '<br>' + string9 + '<br>' + string10 + '<br>' + string11;
  
  return result;
}

document.querySelector('#output_container').innerHTML = drawField();