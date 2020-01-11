// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const AutoComplete_1 = require("./AutoComplete");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    vscode.window.showInformationMessage("Enabling Snippets..");
    let lang = "python3";
    var autoComplete = new AutoComplete_1.AutoComplete(context);
    //Extracts and handle suggestions from JSON
    function handleSuggestionsFromJSON(json) {
        //Empty old list of suggestions
        autoComplete.emptyList();
        //Iterate through each object in json and add to autocomplete
        json.results.forEach(function (item) {
            let id = item.id;
            let name = item.funcName;
            let input = item.input;
            let example = item.example;
            let desc = item.desc;
            autoComplete.add(name, id, lang, desc, example, input);
        });
    }
    //Returns suggestions from Snippetdepot
    function search(query) {
        const fetch = require('node-fetch');
        fetch("https://snippetdepot.com/search/" + lang + "/" + query, { method: "Get" })
            .then((res) => res.json())
            .then((json) => {
            handleSuggestionsFromJSON(json);
        });
    }
    //Extracts the written word in front of cursor
    function getQuery() {
        const activeEditor = vscode.window.activeTextEditor;
        let currentLine = "";
        let query = "";
        if (activeEditor) {
            let cursorPosX = activeEditor.selection.active.character;
            let cursorPosY = activeEditor.selection.active.line;
            currentLine = activeEditor.document.lineAt(cursorPosY).text;
            let beforeCursor = currentLine.substring(0, cursorPosX + 1);
            //Iterate backwards from current cursor position until finding alphanum
            for (var i = (beforeCursor.length - 1); i >= 0; i--) {
                let currentLetter = beforeCursor.charAt(i);
                //Check match against a-zA-Z0-9_
                if (!(/\w/g.test(currentLetter))) {
                    break;
                }
                query = currentLetter + query;
            }
        }
        //Trim white spaces
        query = query.replace(/\s/g, "");
        return query;
    }
    //This content will execute each time a user presses a key
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((e) => {
        //Extract last written word from active document
        let query = getQuery();
        if (query.length > 0) {
            //Fetch suggestions from SnippetDepot
            search(query);
        }
    }));
    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map