function reverseStr(str) {
    return str.split('').reverse().join('');
}


function isPalindrome(str) {
    var reversedString = reverseStr(str);
    return reversedString == str;
}

