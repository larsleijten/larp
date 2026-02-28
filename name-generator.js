const namePatterns = {
    elvish: {
        prefixes: ['Cel', 'Gal', 'Lin', 'Ar', 'El', 'Fin', 'Glor', 'Leg', 'Thran', 'Gil', 'Elu', 'Cír', 'Nim', 'Caladh', 'Aeg', 'Bel', 'Cal', 'Dor', 'Ear', 'Fael', 'Gael', 'Hal', 'Ithil', 'Lael', 'Mor', 'Naeth', 'Orn', 'Pel', 'Sil', 'Thal', 'Uil', 'Vael'],
        middles: ['bor', 'ion', 'fin', 'rond', 'dil', 'las', 'wen', 'ath', 'mir', 'gal', 'thir', 'dan', 'dor', 'fael', 'glin', 'mor', 'riel', 'thil', 'wen', 'dir', 'eth', 'ion', 'las', 'len', 'lon', 'mel', 'nen', 'oth', 'pen', 'ran', 'ros', 'sil', 'tar', 'thor', 'van'],
        suffixes: ['iel', 'as', 'ion', 'orn', 'dir', 'ien', 'wen', 'eth', 'ril', 'dor', 'uil', 'aeth', 'aen', 'aith', 'anel', 'ath', 'dil', 'eas', 'el', 'eth', 'fin', 'gal', 'gion', 'iel', 'ien', 'il', 'ion', 'ith', 'las', 'len', 'leth', 'lis', 'lon', 'los', 'mel', 'mir', 'nar', 'nen', 'nil', 'oth', 'ran', 'ras', 'riel', 'ril', 'rin', 'ros', 'thil', 'thor', 'wen', 'weth'],
        meanings: ['Starlight', 'Moonbeam', 'Forest Song', 'Golden Voice', 'Swift River', 'Mountain Wind', 'Silver Grace', 'Dawn Singer', 'Evening Star', 'Woodland Whisper', 'Crystal Light', 'Autumn Leaf', 'Gentle Rain', 'Spring Blossom', 'Night Sky', 'Pearl Moon', 'Flowing Water', 'Shining Jewel', 'Dancing Flame', 'Morning Dew']
    },
    dwarvish: {
        prefixes: ['Thror', 'Durin', 'Dwalin', 'Gloin', 'Oin', 'Bifur', 'Bofur', 'Nori', 'Dori', 'Ori', 'Fili', 'Kili', 'Bombur', 'Azog', 'Dain', 'Thrain', 'Thror', 'Gror', 'Nain', 'Fundin', 'Groin', 'Hanar', 'Khazad', 'Narvi', 'Telchar'],
        middles: ['ak', 'ek', 'ok', 'rak', 'zak', 'grim', 'dum', 'bar', 'bur', 'dar', 'dok', 'drak', 'gal', 'gar', 'grak', 'grum', 'kar', 'kor', 'krak', 'mok', 'nar', 'rak', 'rok', 'thak', 'thor', 'trok', 'zar', 'zok'],
        suffixes: ['son', 'in', 'un', 'ûr', 'grim', 'bur', 'rak', 'dur', 'ak', 'ar', 'bor', 'din', 'dor', 'ek', 'for', 'gar', 'gor', 'gram', 'im', 'ir', 'kar', 'kin', 'kir', 'mor', 'nar', 'nir', 'ok', 'or', 'ram', 'rik', 'thor', 'thrak', 'tor', 'trok', 'zar', 'zir', 'zor'],
        meanings: ['Stonefist', 'Ironheart', 'Mountain Lord', 'Forge Master', 'Deep Delver', 'Axe Bearer', 'Gold Keeper', 'Hammer Smith', 'Stone Carver', 'Vault Guardian', 'Gem Cutter', 'Iron Will', 'Rock Breaker', 'Flame Tender', 'Mithril Seeker', 'Earth Shaker', 'Steel Soul', 'Mountain Root', 'Diamond Eye', 'Bronze Beard']
    },
    rohan: {
        prefixes: ['Theo', 'Helm', 'Eor', 'Folc', 'Frealaf', 'Brytta', 'Walda', 'Deor', 'Gram', 'Helm', 'Leod', 'Eofor', 'Frumgar', 'Aldor', 'Brego', 'Fengel', 'Thengel', 'Theoden', 'Erkenbrand', 'Grimbold', 'Elfhelm', 'Dunhere', 'Hama', 'Gamling', 'Fastred', 'Guthlaf'],
        middles: ['red', 'ric', 'win', 'wald', 'frid', 'mund', 'brand', 'bald', 'bert', 'gard', 'helm', 'here', 'laf', 'mer', 'mod', 'ric', 'stan', 'ward', 'wig', 'wine', 'wulf', 'beorn', 'gar', 'grim', 'hild', 'lind', 'mar', 'rad', 'sige', 'thegn', 'weard'],
        suffixes: ['ric', 'wald', 'wine', 'mund', 'helm', 'red', 'stan', 'bald', 'beorn', 'bert', 'brand', 'gar', 'gard', 'grim', 'here', 'hild', 'laf', 'lind', 'mar', 'mere', 'mod', 'rad', 'sige', 'thegn', 'ward', 'weard', 'wig', 'wulf', 'wynn'],
        meanings: ['Horse Lord', 'Swift Rider', 'Shield Maiden', 'War Chief', 'Plains Walker', 'Storm Bringer', 'Green Fields', 'Battle Bold', 'Spear Bright', 'Valley Guardian', 'Wind Runner', 'Golden Hall', 'Thunder Hoof', 'Grass Sea', 'Banner Bearer', 'Sword Singer', 'Hill Watcher', 'Mead Hall', 'Horn Blower', 'Mark Defender']
    },
    wizardly: {
        prefixes: ['Mith', 'Curu', 'Olo', 'Airin', 'Palan', 'Rai', 'Ala', 'Vor', 'Sar', 'Rad', 'Mor', 'Pal', 'Ith', 'Mel', 'Man', 'Varda', 'Ulmo', 'Aule', 'Yav', 'Nienna', 'Orome', 'Tulkas', 'Namo', 'Irmo', 'Este', 'Vaire', 'Vana', 'Nessa'],
        middles: ['ran', 'mo', 'ron', 'fin', 'tar', 'wen', 'dur', 'dan', 'dor', 'gal', 'gor', 'ion', 'las', 'man', 'mar', 'mir', 'mor', 'nar', 'nor', 'on', 'ras', 'riel', 'rin', 'ros', 'roth', 'sar', 'tal', 'tar', 'thar', 'thor', 'van', 'vor', 'zar'],
        suffixes: ['dir', 'tur', 'mir', 'fin', 'dil', 'wen', 'ion', 'oth', 'an', 'ar', 'dor', 'dur', 'el', 'gal', 'gor', 'il', 'ion', 'ir', 'las', 'man', 'mar', 'mel', 'mon', 'mor', 'nar', 'nor', 'on', 'os', 'ras', 'riel', 'rin', 'ron', 'ros', 'roth', 'tar', 'thor', 'van', 'zar', 'zon'],
        meanings: ['Wise Wanderer', 'Storm Caller', 'Light Bearer', 'Ancient Power', 'Shadow Walker', 'Fire Heart', 'Star Gazer', 'Time Keeper', 'Rune Master', 'Fate Weaver', 'Dream Walker', 'Spirit Guide', 'Mist Shrouded', 'Truth Seeker', 'Void Touched', 'Ember Soul', 'Sky Reader', 'Thought Spinner', 'Eternal Flame', 'Wisdom Keeper']
    }
};

function generateName() {
    const userName = document.getElementById('userName').value.trim();
    const nameStyle = document.getElementById('nameStyle').value;

    if (!userName) {
        alert('Vul eerst je naam in!');
        return;
    }

    const patterns = namePatterns[nameStyle];
    const seed = hashString(userName);

    // Generate name based on user's name as seed
    const prefix = patterns.prefixes[seed % patterns.prefixes.length];
    const middle = patterns.middles[Math.floor(seed / 10) % patterns.middles.length];
    const suffix = patterns.suffixes[Math.floor(seed / 100) % patterns.suffixes.length];

    const generatedName = prefix + middle + ' ' + suffix;

    const meaning = patterns.meanings[seed % patterns.meanings.length];

    // Display result with animation
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');
    resultDiv.classList.remove('show');

    setTimeout(() => {
        resultDiv.classList.add('show');
        document.getElementById('generatedName').textContent = generatedName;
        document.getElementById('meaning').textContent = `"${meaning}"`;
    }, 50);
}

// Simple hash function to convert name to number
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Allow Enter key to generate name
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('userName');
    if (input) {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                generateName();
            }
        });
    }
});
