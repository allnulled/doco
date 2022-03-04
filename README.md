# misdocos

Command line utility for notes.

## Installation

```sh
npm i -g misdocos
```

## Usage

```sh
# 1) List all docs:
doclist

# 2) Search through docs:
docsearch mydoc "contents to match"

# 3) Add new docs:
docadd mydoc1.md mydoc2.md mydoc3.md

# 4) Update old docs:
docadd --override mydoc2.md mydoc3.md

# 5) Open a specific doc:
docopen mydoc1.md

# 6) Delete previous docs:
docdelete mydoc1.md

# 7) Find matches in all docs:
docfind "contents to match"
```

## License

No license.