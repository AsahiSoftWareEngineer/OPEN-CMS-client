export const make_uuid = () => {
    let chars = "xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

export const make_code = () => {
    let chars = "xxxx-yyy-xxxx-yyy".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

export const make_url = () => {
    let chars = "xyyxxy".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

export const make_key = () => {
    let chars = "xxxyyyyxxxyyy".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

export const any_to_gram = (based, amount) => {
    switch (based) {
        case 0:
            return amount //g
        case 1:
            return amount * 1000 //kg
        case 2:
            return amount * 1000 * 1000 //t
        case 3:
            return amount //amount
    }
}

export const gram_to_any = (based, amount) => {
    switch (based) {
        case 0:
            return amount //g
        case 1:
            return amount / 1000 //kg
        case 2:
            return amount / 1000 * 1000 //t
        case 3:
            return amount //amount
    }
}


export const parse_url = (url, index) => {
    const divided = url.split('/')
    return divided[index]
}

export const parse_csv = (array) => {
    let string = ""
    for (let i = 0; i < array.length; i++) {
        const row = array[i]
        for (let j = 0; j < row.length; j++) {
            string += `${row[j]},`
        }
        string += "\n"
    }
    return string
}

export const parse_base64 = (value) => {
    
}