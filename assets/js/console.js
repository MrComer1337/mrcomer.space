const BLACKLISTED_KEY_CODES = [ 38 ];
const COMMANDS = {
	help:
		'Возможные команды: <span class="code">youtube</span>, <span class="code">vk</span>, <span class="code">instagram</span>, <span class="code">steam</span>, <span class="code">discord</span>, <span class="code">donate</span>',
	youtube:
		"Ютуб канал: <a href='https://youtube.com/MrComer17801?sub_confirmation=1' target='_blank' class='success link'>youtube.com/MrComer17801</a>",
	vk:
		"Страница VK: <a href='https://vk.com/mr_comer' target='_blank' class='success link'>vk.com/mr_comer</a>",
	instagram:
		"Инстаграм: <a href='https://instagram.com/mr.c0m3r' target='_blank' class='success link'>instagram.com/mr.c0m3r</a>",
	steam:
		"Стим: <a href='https://steamcommunity.com/id/MrComerYT' target='_blank' class='success link'>steamcommunity.com/id/MrComerYT</a>",
	discord:
		"Дискорд: <a href='https://Discord.gg/RestlBro' target='_blank' class='success link'>discord.gg/restlbro</a> & <a href='https://discord.gg/V37ZbmN' target='_blank' class='success link'>discord.gg/dusty</a>",
	donate:
		"QIWI Копилка: <a href='https://Qiwi.me/mrcomer' target='_blank' class='success link'>qiwi.me/mrcomer</a>",
	
	dash22a:
		"Самый лучший инст: <a href='https://instagram.com/dash22a' target='_blank' class='success link'>instagram.com/dash22a</a>",
	restl:
		"Рестл? Знаю его, ахуенный чел)) <a href='https://youtube.com/restlgamer' target='_blank' class='success link'>youtube.com/restlgamer",

	disadisadisa:
		"Слышь бес ебливый, ты вообще берега путаешь хуeплет дырявый. Ты бля водолаз не ровно стелишь, так хуле ща люди к тебе кабанчиком метнутся, шуману кому надо, потом опрокинут тебя черт фаршмачный, давай нахуй адресок свой урони с циферками, тебя наберут люди проедешься с ними по лесам, флору фауну посмотришь, белочек покормишь, на жопу можешь не приседать, там хуле псе ровно, спортики схвачены, подъедут скажут от Якута, там уже решать будем что с тобой делать, пальцы отрезать или руки прибить к дереву ебло нахуй. Ты вообще нахуй кто бля, никто ежжи, я бля тот кто тебе лещей раздаст и за щеку накидает, защеканец, давай нахуй ща Айбек с Асланом приедут к тебе, будут из тебя котлетки ебать делать, крест ты нахуй, давай гасись гагус ебливый",	
	files:
		'<span class="code">У вас недостаточно прав для просмотра хранилища</span>',
	hack:
		'<span class="code">Ооо дааа, хакни эту суку полностью!</span>',
	yt:
		"Ютуб канал: <a href='https://youtube.com/MrComer17801?sub_confirmation=1' target='_blank' class='success link'>youtube.com/MrComer17801</a>",
	vkontakte:
		"Страница VK: <a href='https://vk.com/mr_comer' target='_blank' class='success link'>vk.com/mr_comer</a>",
	inst:
		"Инстаграм: <a href='https://instagram.com/mr.c0m3r' target='_blank' class='success link'>instagram.com/mr.c0m3r</a>",
	ds:
		"Дискорд: <a href='https://Discord.gg/RestlBro' target='_blank' class='success link'>discord.gg/restlbro</a> & <a href='https://discord.gg/V37ZbmN' target='_blank' class='success link'>discord.gg/dusty</a>"
};
let userInput, terminalOutput;

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  console.log("Application loaded");
};

const execute = function executeCommand(input) {
  let output;
  input = input.toLowerCase();
  if (input.length === 0) {
    return;
  }
  output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
  if (!COMMANDS.hasOwnProperty(input)) {
    output += `<div class="terminal-line">Команды не существует: ${input}</div>`;
    console.log("Команда не найдена");
  } else {
    output += COMMANDS[input];
  }

  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${output}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const key = function keyEvent(e) {
  const input = userInput.innerHTML;

  if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) {
    return;
  }

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
