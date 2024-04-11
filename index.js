#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
console.log(chalk.cyanBright(`\t<<<===============================================================>>>`));
console.log(chalk.magenta.bold(`\t\t ****** Welcome to Wish_Todo_List ******`));
console.log(chalk.cyanBright(`\t <<<=================================================================>>>`));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: chalk.greenBright("\n\tSelect an option you want to do\n"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if (option.choices === "Add Task") {
            await addTask();
        }
        else if (option.choices === "Delete Task") {
            await deletTask();
        }
        else if (option.choices === "Update Task") {
            await updateTask();
        }
        else if (option.choices === "View Todo-List") {
            await viewTask();
        }
        else if (option.choices === "Exit") {
            conditions = false;
            console.log(chalk.redBright(`\t<<======Thank you for use to my Todo-List 'Bye'========>>\n`));
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellowBright("ADD your new task :")
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.blueBright(`\n\t ****** ${newTask.task} task added successfully in Todo-List  ********\n`));
};
let viewTask = () => {
    console.log(chalk.magentaBright("\n ********* Your todo-List: ******** \n"));
    todoList.forEach((task, index) => {
        console.log(`${index + 1} : ${task}`);
    });
};
let deletTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("\nEnter the 'index no' of the task you want to delete :\n"),
        }
    ]);
    let deletTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.blueBright(`\n\t ${deletTask} Task has been deleted successfully from your todo-List`));
};
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("\nEnter the 'index no' of the task you want to Update :\n"),
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.greenBright("Now Enter new task name"),
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(chalk.blueBright(`\n\t Task at index no .${update_task_index.index - 1} update successfully [for update list check option:"view Todo-List]`));
};
main();
