    $(function() {
        const fileSystem = {
            "/~": { // Root directory
                directories: ["blog", "portfolio"],
                files: ["about.txt", "projects.txt", "contact.txt"]
            },
            "/~/blog": {
                directories: ["gay"],
                files: ["post1.txt", "post2.txt"]
            },
            "/~/portfolio": {
                directories: [],
                files: ["project1.txt", "project2.txt"]
            }
        };
    
        let currentPath = "/~"; // Keeps track of where we are
        function getPrompt() {
            if (currentPath === "/~") {
                return `[iris@Iris.gay ~]$ `;
            } else {
                const shortPath = currentPath.replace("/~/", ""); // Remove "/~/" to get just "blog"
                return `[iris@Iris.gay ${shortPath}]$ `;
            }
        }
    
        $('body').terminal({
            hello: function(what) {
                this.echo('Hello, ' + what + '. Welcome to this terminal.');
            },
            neofetch: function() {
              const asciiArt = [
            '                  ▟█▙                        [[;cyan;]Iris[[;white;]@[[;cyan;]iris.gay',
            '                 ▟███▙                       [[;white;]--------------',
            '                ▟█████▙                      [[;cyan;]OS[[;white;]:  Arch Linux x86_64',
            '               ▟███████▙                     [[;cyan;]Shell[[;white;]: Bash',
            '              ▂▔▀▜██████▙                    [[;cyan;]CPU[[;white;]: Intel Core i7-9700F (8) @ 4.70 GHz',
            '             ▟██▅▂▝▜█████▙                   [[;cyan;]GPU[[;white;]: NVIDIA GeForce RTX 4070',
            '            ▟█████████████▙                  [[;cyan;]Memory[[;white;]: 40GB gddr4',
            '           ▟███████████████▙',
            '          ▟█████████████████▙',
            '         ▟███████████████████▙',
            '        ▟█████████▛▀▀▜████████▙',
            '       ▟████████▛      ▜███████▙',
            '      ▟█████████        ████████▙',
            '     ▟██████████        █████▆▅▄▃▂',
            '    ▟██████████▛        ▜█████████▙',
            '   ▟██████▀▀▀              ▀▀██████▙',
            '  ▟███▀▘                       ▝▀███▙',
            ' ▟▛▀                               ▀▜▙'
          ];

          // Apply trans flag colors to the ASCII art
          const coloredArt = asciiArt.map((line, index) => {
            if (index < 4) {
              return `[[;#55CDFC;]${line}]`; // Light Blue (first 3 lines)
            } else if (index < 7) {
              return `[[;#F7A8B8;]${line}]`; // Light Pink (next 3 lines)
            } else if (index < 10) {
              return `[[;#FFFFFF;]${line}]`; // White (next 3 lines)
            } else if (index < 13) {
              return `[[;#F7A8B8;]${line}]`; // Light Pink (next 3 lines)
            } else {
              return `[[;#55CDFC;]${line}]`; // Light Blue (remaining lines)
            }
          }).join('\n');
          // Echo the colored ASCII art
          this.echo(coloredArt);
            },
            help: function() {
          this.echo('Available commands:');
          this.echo('[[;yellow;]neofetch[[;white;] - Display system information and ASCII art');
          this.echo('[[;yellow;]help[[;white;] - Show this help message');
          this.echo("[[;yellow;]clear[[;white;] - clears your terminal's screen if this is possible")
          this.echo("[[;yellow;]ls[[;white;] - list directory contents")
          this.echo("[[;yellow;]cd[[;white;] - change the working directory")
          this.echo("[[;yellow;]whoami[[;white;] - Tells you a bit about me")
        },
        ls: function() {
            const { directories, files } = fileSystem[currentPath] || { directories: [], files: [] };
            const output = directories.map(dir => `[[;blue;]${dir}/]`).join('  ') + 
                           (directories.length && files.length ? '  ' : '') + 
                           files.join('  ');
            this.echo(output || "[[;gray;]No files or directories]");
        },
        cd: function(dir) {
            if (dir === "..") {
                if (currentPath !== "/~") {
                    currentPath = "/~"; // Move back to root
                } else {
                    this.echo("[[;red;]Already at root directory]");
                }
            } else if (dir === "/~") {
                currentPath = "/~"; // Explicitly move to root
            } else if (fileSystem[currentPath]?.directories.includes(dir)) {
                currentPath = `/~/${dir}`.replace("//", "/"); // Prevent double slashes
            } else {
                this.echo(`[[;red;]cd: No such directory: ${dir}]`);
            }
            this.set_prompt(getPrompt());
        },
        whoami: function() {
          const img = $('<img src="img/iris.jpg">');
          this.echo(img);
          this.echo("[[;white;]Hi, I'm Iris a transfeminine girl (She/Her), also known as citizen287 online.]")
          this.echo("[[;white;]I'm a 16-year-old high school student passionate about cybersecurity, aiming for a future in red teaming.]")  
          this.echo("[[;white;]OSINT is one of my strongest skills I excel at gathering, analyzing, and correlating publicly available data for security research and investigations.")
          this.echo("[[;yellow;]CONTACT INFO\n[[;blue;]Discord[[;white;] - Citizen287\n[[;green;]Email[[;white;] - Iris@iris.gay")  

          this
        },
        },
      {greetings: '[[;red;] ██▓ ██▀███   ██▓  ██████    ▄▄▄█████▓▓█████  ██▀███   ███▄ ▄███▓ ██▓ ███▄    █  ▄▄▄       ██▓\n▓██▒▓██ ▒ ██▒▓██▒▒██    ▒    ▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒▓██▒▀█▀ ██▒▓██▒ ██ ▀█   █ ▒████▄    ▓██▒\n▒██▒▓██ ░▄█ ▒▒██▒░ ▓██▄      ▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒▓██    ▓██░▒██▒▓██  ▀█ ██▒▒██  ▀█▄  ▒██░\n░██░▒██▀▀█▄  ░██░  ▒   ██▒   ░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄  ▒██    ▒██ ░██░▓██▒  ▐▌██▒░██▄▄▄▄██ ▒██░\n░██░░██▓ ▒██▒░██░▒██████▒▒     ▒██▒ ░ ░▒████▒░██▓ ▒██▒▒██▒   ░██▒░██░▒██░   ▓██░ ▓█   ▓██▒░██████▒\n░▓  ░ ▒▓ ░▒▓░░▓  ▒ ▒▓▒ ▒ ░     ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░░ ▒░   ░  ░░▓  ░ ▒░   ▒ ▒  ▒▒   ▓▒█░░ ▒░▓  ░\n ▒ ░  ░▒ ░ ▒░ ▒ ░░ ░▒  ░ ░       ░     ░ ░  ░  ░▒ ░ ▒░░  ░      ░ ▒ ░░ ░░   ░ ▒░  ▒   ▒▒ ░░ ░ ▒  ░\n ▒ ░  ░░   ░  ▒ ░░  ░  ░       ░         ░     ░░   ░ ░      ░    ▒ ░   ░   ░ ░   ░   ▒     ░ ░\n ░     ░      ░        ░                 ░  ░   ░            ░    ░           ░       ░  ░    ░  ░\n[[;white;]welcome to My terminal use[[;yellow;] help[[;white;] to see a list of commands\n[[;yellow;]🚧SITE STILL UNDER CONSTRUCTION, EXPECT BUGS🚧 ',
        name: 'my_terminal',prompt:getPrompt()
    });
});



