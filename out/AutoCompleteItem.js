"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const DependencyHandler_1 = require("./DependencyHandler");
//This class represents a single item in the autocomplete list
class AutoCompleteItem {
    constructor(context, dependencyHandler, name, id, lang, desc, example, input) {
        this.context = context;
        this.dependencyHandler = new DependencyHandler_1.DependencyHandler();
        this.id = id;
        this.name = name;
        this.input = input;
        this.example = example;
        this.desc = desc;
        this.lang = lang;
        this.langID = this.dependencyHandler.getLangID(lang);
        this.createAction(name);
        this.create(name, desc, example, input);
    }
    //Add Snippet to autocomplete list
    create(name, desc, example, input) {
        this.provider = vscode.languages.registerCompletionItemProvider(this.langID, {
            provideCompletionItems(document, position) {
                //Create initial item with just the name
                const snippetCompletion = new vscode.CompletionItem(name);
                //Set the icon of the item to a method
                snippetCompletion.kind = vscode.CompletionItemKind.Method;
                //Compose the text which is to be inserted when choosing snippet
                let insertStr = "";
                if (input === "") {
                    //If there are no parameters
                    insertStr += name + "()";
                }
                else if (input.includes(',')) {
                    //If there are multiple parameters
                    insertStr += name + "(";
                    let params = input.split(",");
                    let count = 1;
                    for (var param of params) {
                        let tempParam = param.replace(/\s/g, "");
                        insertStr += "${" + count + ":" + tempParam + "}" + ",";
                        count += 1;
                    }
                    //Remove excessive ","
                    insertStr = insertStr.substring(0, insertStr.length - 1);
                    insertStr += ")";
                }
                else {
                    //If there is one parameter
                    insertStr += name + "(" + "${1:" + input + "})";
                }
                snippetCompletion.insertText = new vscode.SnippetString(insertStr);
                //Create documentation string
                let docStr = "";
                docStr += "```" + name + "()```";
                docStr += "\n\n-----------------\n";
                docStr += desc;
                docStr += "\n\n-----------------\n";
                docStr += example;
                snippetCompletion.documentation = new vscode.MarkdownString(docStr);
                snippetCompletion.command = { command: 'extension.' + name, title: 'Autocomplete' };
                return [
                    snippetCompletion
                ];
            }
        });
        this.context.subscriptions.push(this.provider);
    }
    //This action will be executed when user selects a Snippet from autocomplete
    action() {
        this.dependencyHandler.addSnippet(this.id);
    }
    //This function registers the function that is to be executed when a user choose an autocomplete item
    createAction(name) {
        const command = 'extension.' + name;
        const commandHandler = () => {
            this.action();
        };
        this.actionHandler = vscode.commands.registerCommand(command, commandHandler);
        this.context.subscriptions.push(this.actionHandler);
    }
    //Remove Snippet from autocomplete list
    remove() {
        if (this.actionHandler !== null && this.actionHandler !== undefined) {
            this.actionHandler.dispose();
        }
        this.provider.dispose();
    }
}
exports.AutoCompleteItem = AutoCompleteItem;
//# sourceMappingURL=AutoCompleteItem.js.map