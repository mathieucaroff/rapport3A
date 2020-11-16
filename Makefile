rapport.pdf: README.md
	bash -c "pandoc -s -V geometry:margin=1.5in -o rapport.pdf README.md --highlight-style kate --toc" && echo done
