#!/usr/bin/env node

import inquirer from 'inquirer';
import { differenceInSeconds } from 'date-fns';

(async function() {
    const res = await inquirer.prompt([{
        type: "input",
        name: "userInput",
        message: "Please enter the amount of seconds",
        validate: function (value) {
            const valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
        },
        filter: Number
    }]);

    let input = res.userInput;

    function startTime(val: number) {
        const endTime = new Date().getTime() + val * 1000;
        
        const intervalId = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeDiff = Math.floor((endTime - currentTime) / 1000);
            
            if (timeDiff <= 0) {
                console.log("Timer has expired");
                clearInterval(intervalId);
                process.exit();
            }
            
            const min = Math.floor(timeDiff / 60);
            const sec = timeDiff % 60;
            console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
        }, 1000);
    }

    startTime(input);
})();
