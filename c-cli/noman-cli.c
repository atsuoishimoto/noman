#include <stdio.h>
#include <stdlib.h>
#include <zip.h>
#include "zip_data.h" // xxd -i で生成したヘッダ

int main(int argc, char* argv[]) {
    if (argc != 2) {
        fprintf(stderr, "使い方: %s <zip内ファイル名>\n", argv[0]);
        return 1;
    }

    zip_error_t error;
    zip_source_t* src = zip_source_buffer_create(archive_zip, archive_zip_len, 0, &error);
    if (!src) {
        fprintf(stderr, "zip_source_buffer_create失敗: %s\n", zip_error_strerror(&error));
        return 1;
    }

    zip_t* za = zip_open_from_source(src, 0, &error);
    if (!za) {
        fprintf(stderr, "zip_open_from_source失敗: %s\n", zip_error_strerror(&error));
        zip_source_free(src);
        return 1;
    }

    zip_file_t* zf = zip_fopen(za, argv[1], 0);
    if (!zf) {
        fprintf(stderr, "ファイルがZIP内に見つかりません: %s\n", argv[1]);
        zip_close(za);
        return 1;
    }

    char buf[4096];
    zip_int64_t n;
    while ((n = zip_fread(zf, buf, sizeof(buf))) > 0) {
        fwrite(buf, 1, n, stdout);
    }

    zip_fclose(zf);
    zip_close(za);
    return 0;
}
