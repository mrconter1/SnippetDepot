"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AutoCompleteItem_1 = require("./AutoCompleteItem");
//This class handles the autocomplete list
class AutoComplete {
    constructor(context) {
        this.context = context;
        this.currentList = [];
    }
    //Add a new item to autocomplete list
    add(name, id, lang, desc, example, input) {
        var item = new AutoCompleteItem_1.AutoCompleteItem(this.context, this.dependencyHandler, name, id, lang, desc, example, input);
        this.currentList.push(item);
    }
    //Iterates through autocomplete list and removes all old items
    emptyList() {
        this.currentList.forEach(function (item) {
            item.remove();
        });
        this.currentList = [];
    }
}
exports.AutoComplete = AutoComplete;
//# sourceMappingURL=AutoComplete.js.map