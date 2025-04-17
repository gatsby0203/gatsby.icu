'use strict';

const DEFAULT_KEY = '3893-9258-K6XJLE';
const DEFAULT_TYPE = '803000';
const DEFAULT_CLASS = 'CC';

const SALT_MAP = {
    'mathematica:14.1+': ['0xD1CF', '0x8C72', '0x4209', '0x73EE', '0x64EC', '0x7C53', '0x5770', '0x7C91', '0xEEFE'],
    'mathematica:13.0-14.1': ['0x5417', '0xB013', '0xD54F', '0x66C0', '0x22DD', '0xCD2D', '0xB4D0', '0xE756', '0x8C68', '0x8250', '0xABEB', '0x60F0', '0x8E3C'],
    'mathematica:12.0-13.0': ['0xE756', '0x8C68', '0x8250', '0xABEB', '0x60F0', '0x8E3C'],
    'mathematica:10.2-12.0': ['0x44F1', '0x29C2', '0xEE71', '0xDB75', '0xD227', '0x2FDB', '0xA439', '0xE4A8', '0xA68B'],
    'mathematica:10.0-10.2': ['0xA439', '0xE4A8', '0xA68B', '0x29F8', '0x6A91', '0x42DD', '0x25DB'],
    'system-modeler:14.1+': ['0xD1CF', '0x5417', '0xB013', '0xD54F', '0x66C0', '0x22DD', '0xCD2D', '0xB4D0', '0xE756', '0x8C68', '0x8250', '0xABEB'],
    'system-modeler:13.0-14.1': ['0x8C72', '0x4209', '0x73EE', '0x64EC', '0x7C53', '0x5770', '0x7C91', '0xEEFE', '0x1361'],
    'system-modeler:5.0-13.0': ['0x5770', '0x7C91', '0xEEFE', '0x1361', '0x755E', '0xA5CE', '0xF536', '0x1330', '0xBF47'],
    'system-modeler:4.0-5.0': ['0x6188', '0xAB0B', '0xB4D3', '0x47C5', '0x81DD', '0x8330'],
    'mathlm:10.0-14.0+': ['0x72A4', '0x29A5', '0x140A', '0x3FD1', '0x452D', '0x541A', '0x3575', '0x7F8C', '0x6587', '0x5B29']
};

document.getElementById('mathid').addEventListener('input', function () {
    this.checkValidity();
});

document.getElementById('actkey').addEventListener('input', function () {
    this.checkValidity();
});

document.getElementById('submit-btn').addEventListener('click', function (e) {
    const actkeyInput = document.getElementById('actkey');
    const lictypeInput = document.getElementById('lictype');
    const licclassInput = document.getElementById('licclass');
    if (actkeyInput.value === '') {
        actkeyInput.value = actkeyInput.placeholder;
    }
    if (lictypeInput.value === '') {
        lictypeInput.value = lictypeInput.placeholder;
    }
    if (licclassInput.value === '') {
        licclassInput.value = licclassInput.placeholder;
    }
});

document.getElementById('keygen-form').addEventListener('submit', function (e) {
    e.preventDefault();
    genPass(e);
});

function toggleTip(button) {
    const tip = button.nextElementSibling;
    tip.classList.toggle('hidden');
}

function updateFields() {
    const sel = document.getElementById('salt');
    const val = sel.value;
    const opt = sel.selectedOptions[0] || {};
    const type = opt.dataset?.type || '';
    const ver = opt.dataset?.ver || '';

    const fields = document.getElementById('fields');
    const actkey = document.getElementById('actkey');
    const lictype = document.getElementById('lictype');
    const lictypeReq = document.getElementById('lictype-req');
    const licclass = document.getElementById('licclass');
    const licclassLbl = document.getElementById('licclass-lbl');

    actkey.placeholder = DEFAULT_KEY;
    if (val) {
        fields.classList.remove('hidden');
    } else {
        fields.classList.add('hidden');
    }

    // License Type required only for Mathematica 14.1+
    const needsLicType = type === 'mathematica' && ver === '14.1+';
    lictype.required = needsLicType;
    lictypeReq.classList.toggle('hidden', !needsLicType);
    if (needsLicType) {
        lictype.placeholder = DEFAULT_TYPE;
    } else {
        lictype.placeholder = '';
    }

    // License Class required only for MathLM
    const isMathLM = type === 'mathlm';
    licclass.required = isMathLM;
    licclass.classList.toggle('hidden', !isMathLM);
    licclassLbl.classList.toggle('hidden', !isMathLM);
    if (isMathLM) {
        licclass.placeholder = DEFAULT_CLASS;
    } else {
        licclass.placeholder = '';
    }
}


function buildKeyString(mathId, actKey, maxProcs = "", licType = "", expDate = "", licClass = "") {
    if (!mathId || mathId.length === 0) return "";
    if (!actKey || !/^\d{4}-\d{4}-[0-9A-Z]{6}$/.test(actKey)) return "";

    let keyStr = mathId;
    if (expDate && expDate.length > 0) keyStr += "@" + expDate;
    if (maxProcs && maxProcs.length > 0) keyStr += ":" + maxProcs;
    if (licClass && licClass.length > 0) keyStr += "*" + licClass;
    if (licType && licType.length > 0) keyStr += "$" + licType;
    keyStr += "&" + actKey;

    return keyStr;
}

function extractParam(keyStr, startChar, endChars) {
    const startIdx = keyStr.indexOf(startChar);
    if (startIdx < 0) return "";

    for (const endChar of endChars) {
        const endIdx = keyStr.indexOf(endChar);
        if (endIdx >= 0 && endIdx > startIdx) {
            return keyStr.substring(startIdx + 1, endIdx);
        }
    }

    return keyStr.substring(startIdx + 1);
}

function getExpDate(keyStr) {
    return extractParam(keyStr, "@", [":", "*", "$", "&"]);
}

function getMaxProcs(keyStr) {
    return extractParam(keyStr, ":", ["*", "$", "&"]);
}

function getLicClass(keyStr) {
    return extractParam(keyStr, "*", ["$", "&"]);
}

function getLicType(keyStr) {
    return extractParam(keyStr, "$", ["&"]);
}

function processSalt(n, byte, c) {
    for (let i = 0; i <= 7; i++) {
        const bit = (byte >> i) & 1;
        if (bit + ((n - bit) & ~1) === n) {
            n = (n - bit) >> 1;
        } else {
            n = ((c - bit) ^ n) >> 1;
        }
    }
    return n;
}

function genPassword(keyStr, salt) {
    const expDate = getExpDate(keyStr);
    const maxProcs = getMaxProcs(keyStr);
    const licClass = getLicClass(keyStr);
    const licType = getLicType(keyStr);

    salt = parseInt(salt);
    const chars = keyStr.split('').map(x => x.charCodeAt());

    // Process first salt
    let salt1 = salt;
    for (let i = chars.length - 1; i >= 0; i--) {
        salt1 = processSalt(salt1, chars[i], 0x105C3);
    }

    /*
        // Verify salt1
        var offset1 = 0;
        while (processSalt(processSalt(salt1, offset1 & 0xFF, 0x105C3), offset1 >> 8, 0x105C3) !== 0xA5B6) {
            offset1 ++;
            if (offset1 >= 0xFFFF) {
                return '';
            }
        }
    */

    salt1 = salt1 ^ 0xCEDF;
    salt1 = Math.trunc(((salt1 + 0x72FA) & 0xFFFF) * 99999 / 0xFFFF);

    let offset1 = '0000' + salt1;
    offset1 = offset1.slice(-5);

    // Process second salt
    let salt2 = parseInt(offset1.substring(0, 2) + offset1.substring(3, 5) + offset1.substring(2, 3));
    salt2 = Math.trunc((salt2 / 99999.0) * 0xFFFF) + 1;
    salt2 = processSalt(processSalt(0, salt2 & 0xFF, 0x1064B), salt2 >> 8, 0x1064B);

    for (let i = chars.length - 1; i >= 0; i--) {
        salt2 = processSalt(salt2, chars[i], 0x1064B);
    }

    /*
        // Verify salt2
        var offset2 = 0;
        while(processSalt(processSalt(salt2, offset2 & 0xFF, 0x1064B), offset2 >> 8, 0x1064B) !== 0xA5B6) {
            offset2 += 1;
            if (offset2 >= 0xFFFF) { return ''; }
        }
    */

    salt2 = salt2 ^ 0xEF22;
    salt2 = Math.trunc((salt2 & 0xFFFF) * 99999 / 0xFFFF);

    let offset2 = '0000' + salt2;
    offset2 = offset2.slice(-5);

    // Build password
    let password = [
        offset2.charAt(3),
        offset1.charAt(3),
        offset1.charAt(1),
        offset1.charAt(0),
        '-',
        offset2.charAt(4),
        offset1.charAt(2),
        offset2.charAt(0),
        '-',
        offset2.charAt(2),
        offset1.charAt(4),
        offset2.charAt(1)
    ].join('');

    // Construct final password
    const parts = [maxProcs, licType, expDate, licClass];
    const lastIndex = parts.map(p => p.length > 0).lastIndexOf(true);
    if (lastIndex >= 0) {
        password += ":" + parts.slice(0, lastIndex + 1).join(":");
    }

    return password;
}

function displayPassword(password) {
    const fieldset = document.getElementById('output-fieldset');
    const code = document.getElementById('output-passwd');
    fieldset.classList.remove('hidden');
    code.textContent = password;
}

const saltIndexMap = {};

function genPass(event) {
    event.preventDefault();

    const form = document.getElementById('keygen-form');
    if (form.reportValidity && !form.reportValidity()) return;
    const product = document.getElementById('salt').selectedOptions[0] || {};
    const type = product.dataset.type;

    const saltKey = document.querySelector('#salt').value;
    const saltList = SALT_MAP[saltKey] || [];
    if (!saltList.length) {
        alert('Unexpected error: invalid salt key: ' + saltKey);
        return;
    }
    if (!(saltKey in saltIndexMap)) {
        saltIndexMap[saltKey] = 0;
    } else {
        saltIndexMap[saltKey] = (saltIndexMap[saltKey] + 1) % saltList.length;
    }
    const salt = saltList[saltIndexMap[saltKey]];
    const isEverywhere = type === 'mathlm';
    const mathId = document.getElementById('mathid').value.trim();
    const actKey = document.getElementById('actkey').value.trim();
    // const maxProcs = document.querySelector('#max-lic-procs').value;
    const maxProcs = "";
    const licType = document.getElementById('lictype').value.trim()
    // const expDate = document.querySelector('#licexp-date').value;
    const expDate = "";
    const licClass = document.getElementById('licclass').value.trim()

    const keyStr = isEverywhere
        ? 'We Are Everywhere!' + buildKeyString(mathId, actKey, maxProcs, licType, expDate, licClass)
        : buildKeyString(mathId, actKey, maxProcs, licType, expDate, licClass);

    const password = genPassword(keyStr, salt);
    displayPassword(
        password
    );
}