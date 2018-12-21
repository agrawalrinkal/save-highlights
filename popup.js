// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// Get the page instance
let page = document.getElementById('buttonDiv');

// Create a map for <backgroundcolor, fontcolor>
const colorMap = new Map();
colorMap.set('#3aa757', '#172617');
colorMap.set('#e8453c', '#000000');
colorMap.set('#f9bb2d', '#1D1905');
colorMap.set('#4688f1', '#E4F1FE');
colorMap.set('#f7f7f7', '#2a2c33');
colorMap.set('#2a2c33', '#f7f7f7');

function constructOptions(colorMap) {
  for (let item of colorMap.keys()) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      // Update the extension global store value and print on console
      chrome.storage.sync.set({backgroundColor: item}, function() {
        console.log('background-color is ' + item);
      })
      chrome.storage.sync.set({color: colorMap.get(item)}, function() {
        console.log('color is ' + colorMap.get(item));
      })

      //Update the page content using the user selected value
      // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

       //  chrome.tabs.executeScript(
       //     tabs[0].id,
       //     {
       //      code: 'document.body.style.backgroundColor = "' + item + '";' +
       //            'document.body.style.color = "' + colorMap.get(item) + '";'
       //     }
       //  );
      //  });
    });
    page.appendChild(button);
  }
}

constructOptions(colorMap);

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    console.log(html);
    return html;
}