// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';
import * as vscode from 'vscode';
import { TextDocumentChangeEvent } from 'vscode';

import { AutoComplete } from "./AutoComplete";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
		
	vscode.window.showInformationMessage("Enabling Snippets..");

	let lang = "python3";
	var autoComplete = new AutoComplete(context);

	//Extracts and handle suggestions from JSON
	function handleSuggestionsFromJSON(json: any[]) {
		//Empty old list of suggestions
		autoComplete.emptyList();
		//Iterate through each object in json and add to autocomplete
		json.results.forEach(function(item: { funcName: string, id: string, desc: string, example: string, input:string}){  
			let id = item.id;
			let name = item.funcName;
			let input = item.input;
			let example = item.example;
			let desc = item.desc;
			autoComplete.add(name, id, lang, desc, example, input);
		});  
	}

	//Returns suggestions from Snippetdepot
	function search(query: string) {
		const fetch = require('node-fetch');
		fetch("https://snippetdepot.com/search/" + lang + "/" + query, {method: "Get"})
			.then((res: { json: () => any; }) => res.json())
			.then((json: any) => {
				handleSuggestionsFromJSON(json);
		});
	}

	//Extracts the written word in front of cursor
	function getQuery() {
		const activeEditor = vscode.window.activeTextEditor;
		let currentLine: string = "";
		let query: string = "";
    	if (activeEditor) {
			let cursorPosX: number = activeEditor.selection.active.character;
			let cursorPosY: number = activeEditor.selection.active.line;
			currentLine = activeEditor.document.lineAt(cursorPosY).text;
			let beforeCursor: string = currentLine.substring(0, cursorPosX + 1);
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
	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((e: TextDocumentChangeEvent) => {

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

// this method is called when your extension is deactivated
export function deactivate() {}
