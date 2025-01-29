function determineAnxietyLevel(score: number) {
    if (score < 0 || score > 21) {
        throw new Error("Invalid score. Please enter a score between 0 and 21");
    }

    if (score >= 0 && score <= 4) {
        return "Minimal Anxiety";
    } else if (score >= 5 && score <= 9) {
        return "Mild Anxiety";
    } else if (score >= 10 && score <= 14) {
        return "Moderate Anxiety";
    } else if (score >= 15 && score <= 21) {
        return "Severe Anxiety";
    }
}

function determineDepressionLevel(score: number) {
    if (score < 0 || score > 27) {
        throw new Error("Invalid score. Please enter a score between 0 and 27.");
    }

    if (score >= 0 && score <= 4) {
        return "Minimal Depression";
    } else if (score >= 5 && score <= 9) {
        return "Mild Depression";
    } else if (score >= 10 && score <= 14) {
        return "Moderate Depression";
    } else if (score >= 15 && score <= 19) {
        return "Moderately Severe Depression";
    } else if (score >= 20 && score <= 27) {
        return "Severe Depression";
    }
}

function determineAlcoholUseLevel(score: number) {
    if (score < 0) {
        throw new Error("Invalid score. Please enter a valid AUDIT score.");
    }

    if (score >= 0 && score <= 7) {
        return "Low risk use of Alcohol use";
    } else if (score >= 8 && score <= 15) {
        return "Hazardous use of Alcohol";
    } else if (score >= 16 && score <= 19) {
        return "Harmful use of Alcohol";
    } else if (score >= 20) {
        return "Possible dependence on Alcohol";
    }
}

export {
    determineAnxietyLevel,
    determineDepressionLevel,
    determineAlcoholUseLevel
}