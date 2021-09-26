var dateOfBirth = document.querySelector("#input-dob");
var btnSubmit = document.querySelector("#btn-submit");
var outputBox = document.querySelector("#show-message");

function reverseStr(str) {
    return str.split('').reverse().join('');
}


function isPalindrome(str) {
    var reversedString = reverseStr(str);
    return reversedString == str;
}

function convertDateToString(date) {
    var dateStr = { day: '', month: '', year: ''};

    if(date.day <10 ) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if(date.month <10 ) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);

    isPalindromeCheck = false;

    for (var i=0; i < listOfPalindromes.length; i++) {

        if(isPalindrome(listOfPalindromes[i])) {
            isPalindromeCheck = true;
            break;
        }
    }
    return isPalindromeCheck;
}

function isLeapYear(year) {
    if(year % 400 === 0) {
        return true;
    }
    if(year % 100 === 0) {
        return false;
    }
    if(year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day +1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2) {
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month++;
            }
        } else {
            if(day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if(day > daysInMonth[month-1]) {
            day = 1;
            month++;
        }
    }

    if(month > 12) {
        month = 1;
        year++;
    }
    
    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    var nextDateCounter = 0;
    var nextDate = getNextDate(date);

    while(1) {
        nextDateCounter++;
        if(checkPalindromForAllDateFormats(nextDate)) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [nextDateCounter, nextDate];
}

function getPrevDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    if(month == 3 ) {
        if(day < 1) {
            if(isLeapYear(year)) {
                day = 29;
                month--;
            } else {
                day = 28;
                month--;
            }
        }
    } else if(month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11) {
        if(day < 1) {
            day = 31;
            month--;
        }
    } else if( month == 1) {
        day = 31;
        month = 12;
        year--;        
    } else {
        if(day < 1) {
            day = 30;
            month--;
        }
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getPrevPalindromeDate(date) {
    var prevDateCounter = 0;
    var prevDate = getPrevDate(date);

    while(1) {
        prevDateCounter++;
        if(checkPalindromForAllDateFormats(prevDate)) {
            break;
        }
        prevDate = getPrevDate(prevDate);
    }

    return [prevDateCounter, prevDate];
}

function clickHandler() {
    var dobString = dateOfBirth.value;

    if(dobString !== '') {
        var listOfDate = dobString.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPalindrome = checkPalindromForAllDateFormats(date);

        if(isPalindrome) {
            outputBox.innerText = "Yay! Your date of birth is a Palindrome";
        } else {
            var nextPalindromeDate = getNextPalindromeDate(date);
            var prevPalindromeDate = getPrevPalindromeDate(date);

            if( nextPalindromeDate[0] < prevPalindromeDate[0]) {
                outputBox.innerText = "Sorry your date of birth is not a Palindrome. The closest date of birth is " + nextPalindromeDate[0] + " days in the future. The date is " + nextPalindromeDate[1].day + "-" + nextPalindromeDate[1].month + "-" + nextPalindromeDate[1].year + " (DD-MM-YYYY).";
            } else {
                outputBox.innerText = "Sorry your date of birth is not a Palindrome. The closest date of birth is " + prevPalindromeDate[0] + " days in the past. The date is " + prevPalindromeDate[1].day + "-" + prevPalindromeDate[1].month + "-" + prevPalindromeDate[1].year + " (DD-MM-YYYY).";
            }
        }
    }
}

btnSubmit.addEventListener("click", clickHandler);