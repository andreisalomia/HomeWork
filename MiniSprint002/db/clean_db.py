import csv
import re
import sys

INPUT  = 'data.csv'
OUTPUT = 'data_clean.csv'

def clean_coordinate(value: str) -> str:
    v = value.strip()
    if not v:
        return ''

    double_dot = re.match(r'^(-?\d+)\.(\d+)\.(\d+)$', v)
    if double_dot:
        fixed = f"{double_dot.group(1)}.{double_dot.group(2)}{double_dot.group(3)}"
        try:
            float(fixed)
            return fixed
        except ValueError:
            return ''

    try:
        float(v)
        return v
    except ValueError:
        return ''

def clean_address(value: str) -> str:
    v = value.strip()
    if not v or v == '.':
        return ''
    if re.search(r'[a-zA-Z]', v) and re.search(r'\d', v):
        return v
    return ''

def clean_phone(value: str) -> str:
    v = value.strip()
    if not v:
        return ''
    if re.search(r'E\+', v, re.IGNORECASE):
        return ''
    return v

def clean_rating(value: str) -> str:
    v = value.strip()
    if not v:
        return ''

    if re.match(r'^\d+\.May$', v, re.IGNORECASE):
        return ''

    try:
        num = float(v)
        if num == -1:
            return ''
        return str(num)
    except ValueError:
        return ''

def main():
    with open(INPUT, encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=';')
        headers = [h.strip() for h in next(reader)]

        lat_idx    = headers.index('Property Latitude')
        lng_idx    = headers.index('Property Longitude')
        rating_idx = headers.index('Sabre Property Rating')
        addr1_idx  = headers.index('Property Address 1')
        addr2_idx  = headers.index('Property Address 2')
        phone_idx  = headers.index('Property Phone Number')
        fax_idx    = headers.index('Property Fax Number')

        warnings = 0
        rows_out = []

        for row in reader:
            if not any(row):
                continue

            row = [v.strip() for v in row]

            while len(row) < len(headers):
                row.append('')

            for idx, label in [(lat_idx, 'lat'), (lng_idx, 'lng')]:
                raw = row[idx]
                cleaned = clean_coordinate(raw)
                row[idx] = cleaned

            raw_r = row[rating_idx]
            cleaned_r = clean_rating(raw_r)
            row[rating_idx] = cleaned_r

            for idx, label in [(addr1_idx, 'addr1'), (addr2_idx, 'addr2')]:
                raw = row[idx]
                cleaned = clean_address(raw)
                row[idx] = cleaned

            for idx, label in [(phone_idx, 'phone'), (fax_idx, 'fax')]:
                raw = row[idx]
                cleaned = clean_phone(raw)
                if raw and not cleaned:
                    warnings += 1
                row[idx] = cleaned

            rows_out.append(row)

    with open(OUTPUT, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f, delimiter=';')
        writer.writerow(headers)
        writer.writerows(rows_out)

if __name__ == '__main__':
    main()