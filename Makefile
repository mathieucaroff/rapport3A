rapport.pdf: rapport4/rapport4.md
	cd rapport4 && bash -c "pandoc -s -V geometry:margin=1.5in -o ../rapport.pdf rapport4.md --highlight-style kate --toc"
