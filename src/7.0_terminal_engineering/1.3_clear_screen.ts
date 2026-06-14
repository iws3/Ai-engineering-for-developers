// making a pull request:

// 2.5 Clearing the Screen
// There are multiple ways to clear content from the terminal, and choosing the right one matters. Clearing
// the entire screen on every frame is the simplest approach but causes visible flicker. In Chapter 6 we will
// learn smarter techniques, but for now here are all the clearing commands


const ESC="\x1b";

export const clear={
    // Erase the entire screen, Does Not move the cursor
    screen: () =>`${ESC}[2J`,
    toEnd:()=>`${ESC}[0J`,
    toStart:()=>`${ESC}[1J`,
    // Erase the entire current line
    line:()=>`${ESC}[2K`,
    // ERASE FROM THE CURSOR TO THE END OF THE LINE     
    lineToEnd:()=>`${ESC}[0K`,
    // erase from the start of the line to cursor
    lineToStart:()=>`${ESC}[1K`,
    // switch tot he "alternate screen buffer"  a clean blanc canvas.
    // This is what vim, htop, etc do when they open
    // your previous terminal content is preserved and restored on exit.
    enterAltScreen:()=>`${ESC}[?1049h`,
    exitAltScreen:()=>`${ESC}[?10491`,


}

// / CRITICAL: Always exit the alternate screen on program close.
// // If you forget, the user's terminal will be left on a blank screen.


process.on("exit", ()=>{
    process.stdout.write(clear.exitAltScreen());
    process.stdout.write("\x1b[?25h"); // Also restore cursor
})
