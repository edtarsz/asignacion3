import readline from "readline";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export async function preguntar(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}