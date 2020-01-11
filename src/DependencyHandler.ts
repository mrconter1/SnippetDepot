import * as vscode from 'vscode';
import * as fs from 'fs';

//This class contains methods for adding the snippet to the project
export class DependencyHandler {

	filetype: string;

	constructor() {
		this.filetype = this.getFiletype();
	}

    //If line in document contains string
	lineContains(substring: string): boolean {
		
		var lineCount = vscode.window.activeTextEditor.document.lineCount;

		for (var i = 0; i < lineCount; i++) {
			var currentLine = vscode.window.activeTextEditor.document.lineAt(i).text;
			if (currentLine.includes(substring)) {
				return true;
			}
		}

		return false;

	}

	//Checks if a given piece of code exists within a file
	appendCodeToFile(filename: string, code: string): void {

		let folderPath = this.getFileFolder();

		//Add two spaces under each snippet
		code += "\n\n";
		
		//Write code to file
		fs.appendFile(folderPath + filename, code,  function(err) {
            if (err) {
                return console.error(err);
            }
		});

	}

	//Appends snippet to file if it is not already present
	appendSnippet(filename: string, code: string): void {

		let parent = this;
		let folderPath = this.getFileFolder();

		//Check if dependency file already contains code
		fs.readFile(folderPath + filename, function (err, data) {
			//Append if file not exist or snippet not in file
            if (err || !data.toString().includes(code)) {
				parent.appendCodeToFile(filename, code);
  			}
		});

	}

	//General snipping adding function
	addSnippet(id: string): void {

		this.filetype = this.getFiletype();	
		if (this.filetype === "") {
			vscode.window.showInformationMessage("Please save file before using Snippets..");
			return;
		}
		
		if (this.filetype === ".py") {
			this.addPythonSnippet(id);
		}
		
	}

	//Python specific function for adding Snippet
	addPythonSnippet(id: string): void {

		let importStatement = "from deps import *";

		//Make sure import line is added on top of document
		if (!this.lineContains(importStatement)) {
			vscode.window.activeTextEditor.edit(editBuilder => {
				editBuilder.insert(new vscode.Position(0, 0), importStatement + "\n");
				editBuilder.insert(new vscode.Position(0, 0), "\n");
			});
		}

		//Fetch Snippet and append it at the end of the document
		const fetch = require('node-fetch');
		fetch("https://snippetdepot.com/getSnippet/" + id, {method: "Get"})
			.then((res: { json: () => any; }) => res.json())
			.then((json: any) => {
				this.appendPythonSnippet(json);
		});

	}

	appendPythonSnippet(json: any): void {

		let filename = "deps.py";
		let code = json.code;

		this.appendSnippet(filename, code);
	}

	//Returns the filetype for the current file editor
	getFiletype(): string {

		let filename = vscode.window.activeTextEditor.document.fileName;
		if (!filename.includes(".")) {
			return "";
		}
		let fileSplit = filename.split(".");
		let fileType = "." + fileSplit[fileSplit.length - 1];
		return fileType;
	}

	//Returns path to folder in which the current file exist
	getFileFolder(): string {

		let folderPath = vscode.window.activeTextEditor.document.uri.fsPath;
		let folderSplit= folderPath.split("/");
		folderPath = folderSplit.slice(0, folderSplit.length - 1).join("/") + "/";

		return folderPath;
	}

	//Language IDs are needed in order for the autocomplete items to show up in the autocomplete list
	//A list of them can be found here: https://code.visualstudio.com/docs/languages/identifiers
	getLangID(lang: string): string {

		if (lang === "python3") {
			return "python";
        }

        return "plaintext";

	}

}