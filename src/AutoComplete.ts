import * as vscode from 'vscode';
import { AutoCompleteItem } from './AutoCompleteItem';

//This class handles the autocomplete list
export class AutoComplete {

    context: any;
    currentList: any;
    dependencyHandler: any;

    constructor(context: vscode.ExtensionContext) {

        this.context = context;
        this.currentList = [];

    }

    //Add a new item to autocomplete list
    add(name: string, id: string, lang: string, desc: string, example: string, input: string): void {

        var item = new AutoCompleteItem(this.context, this.dependencyHandler, name, id, lang, desc, example, input);
        this.currentList.push(item);

    }

    //Iterates through autocomplete list and removes all old items
    emptyList(): void {

        this.currentList.forEach(function (item: AutoCompleteItem) {
            item.remove();
        });
        this.currentList = [];

    }

}
