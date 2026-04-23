package com.garipticaret.garipticaretbe.shared;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class SlugUtil {

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("\\s+");
    private static final Pattern MULTIPLE_DASH = Pattern.compile("-+");

    private SlugUtil() {}

    public static String toSlug(String input) {
        if (input == null || input.isBlank()) return "";

        String result = input.toLowerCase(Locale.ROOT)
                .replace("ş", "s")
                .replace("ğ", "g")
                .replace("ü", "u")
                .replace("ö", "o")
                .replace("ı", "i")
                .replace("ç", "c")
                .replace("İ", "i")
                .replace("Ş", "s")
                .replace("Ğ", "g")
                .replace("Ü", "u")
                .replace("Ö", "o")
                .replace("Ç", "c");

        result = Normalizer.normalize(result, Normalizer.Form.NFD);
        result = NON_LATIN.matcher(result).replaceAll("-");
        result = WHITESPACE.matcher(result).replaceAll("-");
        result = MULTIPLE_DASH.matcher(result).replaceAll("-");
        result = result.replaceAll("^-|-$", "");

        return result;
    }
}