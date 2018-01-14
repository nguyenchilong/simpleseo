# Simple SEO
Simple detect SEO in html file by nodejs. This is only support command line not interface.

# Run example
* The first for run ``npm install`` for install modules.
* Next open terminal then enter ``cd`` command to folder store this repository.
* And run command ``node validate.js -f cheerio.html -r rules.txt`` and view results.

# Custom rules for SEO
* Go to rules.txt and edit this file, remove or add new rule here.
* It's very simple and only support bellow(key in rules.txt file is ``element name or tag name``)
  * required: this rule check element exists or not in html file.
  * more: this rule check element have more number set before.
  * count: this rule show total element have in html file.
  * has_attr: this rule check attribute of element exists and not empty.

