var dateOfBirth = document.querySelector("#b-Day");
var button = document.querySelector("#button");
var outputOnDOM = document.querySelector("#output");

// Part 1
function strReverse(str) {
    var strSplit = str.split("");
    var reverseStr = strSplit.reverse();
    var reverse = reverseStr.join("");
    // var reverse1 = str.split("").reverse().join("");

    return reverse
}

function isPalindrome(str) {
    var dateReverse = strReverse(str)
    return str === dateReverse
}

function covertNumberToString(date) {
    var dateStr = {
        day: "",
        month: "",
        year: ""
    }

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr
}


function allVariationsOfDate(date) {
    var dateString = covertNumberToString(date);

    var DDMMYYYY = dateString.day + dateString.month + dateString.year;
    var MMDDYYYY = dateString.month + dateString.day + dateString.year;
    var YYYYMMDD = dateString.year + dateString.month + dateString.day;
    var DDMMYY = dateString.day + dateString.month + dateString.year.slice(-2);
    var MMDDYY = dateString.month + dateString.day + dateString.year.slice(-2);
    var YYMMDD = dateString.year.slice(-2) + dateString.month + dateString.day;

    var differentDateVariations = [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];

    return differentDateVariations;
}

function checkPalindromeForAllFormats(date) {
    var dateVariations = allVariationsOfDate(date);
    var flag = false;

    for (let i = 0; i < dateVariations.length; i++) {
        if (isPalindrome(dateVariations[i])) {
            flag = true;
            break;
        }
    }

    return flag
}


// Part 2
function checkLeapYear(year) {
    if ((year % 400 === 0) || (year % 4 === 0)) {
        return true;
    } else {
        return false;
    }
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];



    //check for February
    if (month === 2) {
        //check for Leap Year
        if (checkLeapYear(year)) {
            // its a Leap Year
            if (day > 29) {
                day = 1;
                month++;
            }

        }
        // its not a Leap Year
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }

    // check for other months
    else {

        // check for a day is greater than the days in a month
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }

        // check for a month is gretaer than the months in a year
        if (month > 12) {
            month = 1;
            year++;
        }
    }


    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    //check for March/February
    if (month === 3) {
        //check for Leap Year
        if (checkLeapYear(year)) {
            // its a Leap Year
            if (day < 1) {
                day = 29;
                month = month-1;
            }
        }
        // its not a Leap Year
        else {
            if (day < 1) {
                day = 28;
                month = month-1;
            }
        }
    }
    
    // check for other months   
    else {
        // check for a day is less than 1
        if (1 > day) { 

            //check for the 1st month
            if (month === 1) {
                day = 31;
                month = month-1;
            } 
            //check for the other months
            else {
                var newDay = month - 2
                day = daysInMonth[newDay];
                month = month-1 ;
            }
        }
            
        //check for the month less than 1
        if (month <  1) {
            month = 12; 
            year= year-1; 
        }
    }



    return {
        day: day,
        month: month,
        year: year
    }
}


function nextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        if (checkPalindromeForAllFormats(nextDate)) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

function previousPalindromeDate(date) {
    var ctr = 0;
    var previousDate = getPreviousDate(date)

    while (1) {
        ctr++;
        if (checkPalindromeForAllFormats(previousDate)) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return [ctr, previousDate];
}





function clickHandler() {
    var birthDay = (dateOfBirth.value);

    if (birthDay !== "") {
        var dateVariables = birthDay.split("-")

        var date = {
            day: Number(dateVariables[2]),
            month: Number(dateVariables[1]),
            year: Number(dateVariables[0])
        }
    }

    var isPalindrome = checkPalindromeForAllFormats(date);
    if (isPalindrome) {
        outputOnDOM.innerText = "Yay!!! Your Birthday is a palindrome 🥳🥳"
    } else {
        var [ctr, nextDate] = nextPalindromeDate(date);
        var [ctr1, previousDate] = previousPalindromeDate(date);
        if (ctr <= ctr1) {
            outputOnDOM.innerText = `Sorry, Your birthday is not a palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${ctr} days!! ☹️☹️`
        } else {
            outputOnDOM.innerText = `Sorry, Your birthday is not a palindrome. The nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}. You missed it by ${ctr1} days!! ☹️☹️`
        }
        
    }

    console.log(ctr, ctr1)

}



button.addEventListener("click", clickHandler)


