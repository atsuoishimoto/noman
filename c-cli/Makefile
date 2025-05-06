TARGET = noman
ZIP_JA = noman-ja.zip
ZIP_EN = noman-en.zip
ZIP_JA_HEADER = zip_ja.h
ZIP_EN_HEADER = zip_en.h
SRC = main.c

all: $(TARGET)

# Generate Japanese header
$(ZIP_JA_HEADER): $(ZIP_JA)
	xxd -i $< > $@.tmp
	sed 's/^unsigned/static const unsigned/g' $@.tmp > $@
	rm $@.tmp

# Generate English header
$(ZIP_EN_HEADER): $(ZIP_EN)
	xxd -i $< > $@.tmp
	sed 's/^unsigned/static const unsigned/g' $@.tmp > $@
	rm $@.tmp

# Build
$(TARGET): $(SRC) $(ZIP_JA_HEADER) $(ZIP_EN_HEADER)
	gcc -o $@ $(SRC) -lzip

clean:
	rm -f $(TARGET) $(ZIP_JA_HEADER) $(ZIP_EN_HEADER)
