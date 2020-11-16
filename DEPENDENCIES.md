# Rapport

This is my report for my internship of June to November 2020 at Orness, working for Crédit Agricole Corporate Investment Bank.

## Generation of the PDF version

### Dependencies

- make (`choco install make`)
- WSL

```
sudo apt install \
    pandoc \
    texlive-fonts-recommended \
    texlive-latex-extra \
    texlive-xetex \
```

I believe the above should suffice.

## Generation

You will need to export the svg image as png, and the drawio document as png too. I used Inkscape and draw.io to do it for myself.

Then, run:

```
make
```

## Automatic generation

```
.\makeloop.ps1
```

Since make doesn't generate a file whose dependencies have stayed unchanged, the above loop will only run pandoc when a file has been changed.
