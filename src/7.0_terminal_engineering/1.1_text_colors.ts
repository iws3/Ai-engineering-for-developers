// the escape character (\x1b) opens the command , a left bracket introduce the parameter list.. the parameter tell the terminal what to do, AND TE FINAL LTTER IDENTIFIES THE TYPE OF COMMAD. eg \x1b[2J clears the entire screen.  \x1b is the escape. [ opens the sequence, 2 is the parameter (meaning 'entire screen') and j is the commnad letter ('meaning erase display')

// 2.2 Text Colors

// Colors are the most commonly used escape codes and the first ones you should master. The m
// command (Select Graphic Rendition) controls all styling. The basic 16-color palette uses codes 30–37
// for foreground and 40–47 for background, with code 0 resetting everything back to the default:

// the escape character that start every ANSI sequence

const ESC = "\x1b";
// helper to build color sequence. the "m" at the end menas . select the "Graphic Rendition" it applies text styling.
const ansi=(code:number | string)=>`${ESC}[${code}m`;
// reset all styling back to the terminal default
const RESET=ansi(0);
// foreground colors
const colors={
    black:ansi(30),
    red:ansi(31),
    green:ansi(32),
    yellow:ansi(33),
    blue:ansi(34),
    magenta:ansi(35),
    cyan:ansi(36),
    white:ansi(37)
}

// Text styles: bold, dim, italic, underline.
const style = {
  bold: ansi(1),
  dim: ansi(2),
  italic: ansi(3),
  underline: ansi(4),
  blink: ansi(5),
  inverse: ansi(7), // Swaps foreground and background.
  hidden: ansi(8),
  strikethrough: ansi(9),
};


console.log("hello there")

console.log(RESET)

// 
// The basic 16-color palette is fine for simple programs, but modern terminals support 256 colors and
// even 24-bit RGB color (called 'true color'). These use extended SGR sequences with additional
// parameters:



const color256 = (n: number) => `${ESC}[38;5;${n}m`;
const bg256 = (n: number) => `${ESC}[48;5;${n}m`;


// Usage: always reset after coloring text.
process.stdout.write(
 `${colors.red}${style.underline}Success!${RESET} Operation complete.\n`
);


// // 2.3 256-Color and True Color (RGB)
// The basic 16-color palette is fine for simple programs, but modern terminals support 256 colors and
// even 24-bit RGB color (called 'true color'). These use extended SGR sequences with additional
// parameters:
// 256-Color mode: codes 38;5<n> for foreground, 48;5<n> for background

// The color index n ranges from 0 (black) to 255 (high white).

// indices 0-15: standard colrs, 16-231: a 6x6x6 color cube,
// and 232-255: a grayscale ramp. For example, color 196 is bright red, and 46 is bright green.

// True color (24-bit RGB): codes 38;2;<r>;<g>;<b>
// This is exactly like CSS rgb() — full 16 million color support. For example, 38;2;255;0;0 is bright red, and 38;2;0;255;0 is bright green.

const colorRGB=(r:number, g:number, b:number)=>`${ESC}[38;2;${r};${g};${b}m`;
const bgRGB = (r: number, g: number, b: number) =>
`${ESC}[48;2;${r};${g};${b}m`;
// example draw a gradient of reds across a line.
let gradient1="";
let gradient2="";
let gradient3="";

for (let i=0;i<40;i++){
  const r=Math.round((i/39)*255);
  gradient1+=`${bgRGB(0,  r,  0)}  `;
  gradient2+=`${bgRGB(r,  0,  0)}  `;
  gradient3+=`${bgRGB(0,  0,  r)}  `;


}
// console.log("drawing.........")
process.stdout.write(gradient1 + RESET + "\n");
process.stdout.write(gradient2 + RESET + "\n");
process.stdout.write(gradient3 + RESET + "\n");
