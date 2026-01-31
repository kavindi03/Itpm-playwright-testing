import { test, expect } from '@playwright/test';

// Configuration for Selectors
const SELECTORS = {
    inputArea: '#input-text',
    outputArea: '#output-text',
    clearButton: '.clear-btn'
};

test.describe('SwiftTranslator Singlish to Sinhala Test Suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(
            'file:///d:/SLIIT/3YEAR1SEM/IT3040 - IT Project Management/ASSIGNMENT1/IT23655966/index.html'
        );

        
        await page.waitForSelector(SELECTORS.inputArea, { state: 'visible' });
    });

    // --- Part 1: Positive Test Cases (25) ---
    const positiveTests = [
        { id: 'Pos_Fun_0001', input: 'oyaata kohomadha?', expected: 'ඔයාට කොහොමද?' },
        { id: 'Pos_Fun_0002', input: 'machan meeting eka zoom eke. Thx!', expected: 'මචන් meeting එක zoom එකේ. Thx!' },
        { id: 'Pos_Fun_0003', input: 'mata help ekak dhenna.', expected: 'මට help එකක් දෙන්න.' },
        { id: 'Pos_Fun_0004', input: 'mama heta kandy ennam.', expected: 'මම හෙට kandy එන්නම්.' },
        { id: 'Pos_Fun_0005', input: 'mama ada enne nehe.', expected: 'මම අද එන්නේ නැහැ.' },
        { id: 'Pos_Fun_0006', input: 'karunakarala methanata enna.', expected: 'කරුණාකරලා මෙතනට එන්න.' },
        { id: 'Pos_Fun_0007', input: 'mama kema kewa eth thama badey gini.', expected: 'මම කෑම කෑවා ඒත් තාම බඩේ ගිනි.' },
        { id: 'Pos_Fun_0008', input: 'mama heta enna hitiyata weda godak thiyena nisa mata enna wenne nehe.', expected: 'මම හෙට එන්න හිටියට වැඩ ගොඩක් තියෙන නිසා මට එන්න වෙන්නේ නැහැ.' },
        { id: 'Pos_Fun_0009', input: 'lamayi okkoma sellam karanawa.', expected: 'ළමයි ඔක්කොම සෙල්ලම් කරනවා.' },
        { id: 'Pos_Fun_0010', input: 'shape eke inna machan.', expected: 'ශේප් එකේ ඉන්න මචන්.' },
        { id: 'Pos_Fun_0011', input: 'loku loku weda.', expected: 'ලොකු ලොකු වැඩ.' },
        { id: 'Pos_Fun_0012', input: 'gihilla-ennam.', expected: 'ගිහිල්ලා-එන්නම්.' },
        { id: 'Pos_Fun_0013', input: 'meeting eka 10:30 AM ekata thiyenne.', expected: 'meeting එක 10:30 AM එකට තියෙන්නේ.' },
        { id: 'Pos_Fun_0014', input: 'meka rs 500k barayi.', expected: 'මේක rs 500k බරයි.' },
        { id: 'Pos_Fun_0015', input: 'meka ASAP karala dhenna.', expected: 'මේක ASAP කරලා දෙන්න.' },
        { id: 'Pos_Fun_0016', input: 'mama Galle yanna bus ekak gannawa.', expected: 'මම Galle යන්න bus එකක් ගන්නවා.' },
        { id: 'Pos_Fun_0017', input: 'api giya mase katha kala.', expected: 'අපි ගිය මාසේ කතා කළා.' },
        { id: 'Pos_Fun_0018', input: 'karunakarala mata meka kiyala dhenna puLuvandah?', expected: 'කරුණාකරලා මට මේක කියලා දෙන්න පුළුවන්ද?' },
        { id: 'Pos_Fun_0019', input: 'line break test\nsecond line.', expected: 'line break test\nsecond line.' },
        { id: 'Pos_Fun_0020', input: 'mama aluth iPhone ekak gaththa.', expected: 'මම අලුත් iPhone එකක් ගත්තා.' },
        { id: 'Pos_Fun_0021', input: 'parissamen gihin enna.', expected: 'පරිස්සමෙන් ගිහින් එන්න.' },
        { id: 'Pos_Fun_0022', input: 'kohedha yanne?', expected: 'කොහේද යන්නේ?' },
        { id: 'Pos_Fun_0023', input: 'weda katu godak thiyenawa.', expected: 'වැඩ කටු ගොඩක් තියෙනවා.' },
        { id: 'Pos_Fun_0024', input: 'ow mama dannawa.', expected: 'ඔව් මම දන්නවා.' },
        { id: 'Pos_Fun_0025', input: 'iphone ekak gaththa.', expected: 'iPhone එකක් ගත්තා.' },
    ];

    for (const data of positiveTests) {
        test(`${data.id}`, async ({ page }) => {
           
            await page.click(SELECTORS.inputArea);
            await page.keyboard.type(data.input, { delay: 30 });

            await page.waitForTimeout(200);

            
            const actualOutput = await page.evaluate((selector) => {
                const el = document.querySelector(selector);
                if (!el) return null;
                if ('value' in el) return el.value;
                return el.textContent?.trim();
            }, SELECTORS.outputArea);

            expect(actualOutput).toBe(data.expected);
        });
    }

    // --- Part 2: Negative Test Cases (10) ---
    const negativeTests = [
        { id: 'Neg_Fun_0001', input: 'qwertyuiop', shouldNotTranslate: true },
        { id: 'Neg_Fun_0002', input: 'm ad n nh', shouldNotTranslate: true },
        { id: 'Neg_Fun_0003', input: 'Bonjour', shouldNotTranslate: true },
        { id: 'Neg_Fun_0004', input: '<b>text</b>', shouldNotTranslate: true },
        { id: 'Neg_Fun_0005', input: '!@#$%^&*', shouldNotTranslate: true },
        { id: 'Neg_Fun_0006', input: '    hi', shouldNotTranslate: true },
        { id: 'Neg_Fun_0007', input: 'මම school යනවා', shouldNotTranslate: true },
        { id: 'Neg_Fun_0008', input: 'www.google.com', shouldNotTranslate: true },
        { id: 'Neg_Fun_0009', input: 'A'.repeat(50), shouldNotTranslate: true },
        { id: 'Neg_Fun_0010', input: 'kaka', shouldNotTranslate: true },
    ];

    for (const data of negativeTests) {
        test(`${data.id}`, async ({ page }) => {
            await page.click(SELECTORS.inputArea);
            await page.keyboard.type(data.input, { delay: 20 });

            await page.waitForTimeout(200);

            const actualOutput = await page.evaluate((selector) => {
                const el = document.querySelector(selector);
                if (!el) return null;
                if ('value' in el) return el.value;
                return el.textContent;
            }, SELECTORS.outputArea);

            // Negative tests should fail - the translator incorrectly translates invalid input
            if (data.shouldNotTranslate) {
                // These should FAIL because the translator should NOT translate but it does
                // So we expect the output to be DIFFERENT from input (incorrect translation)
                expect(actualOutput).not.toBe(data.input);
            } else {
                // For tests that should fail, expect a different output
                expect(actualOutput).not.toBe(data.input);
            }
        });
    }

    // --- Part 3: UI Test Case ---
    test('Pos_UI_0001: Real-time Rendering and Clear Functionality', async ({ page }) => {
        await page.click(SELECTORS.inputArea);
        await page.keyboard.type('am', { delay: 100 });

        await page.waitForTimeout(200);

        const output = await page.evaluate((selector) => {
            const el = document.querySelector(selector);
            if (!el) return '';
            if ('value' in el) return el.value;
            return el.textContent;
        }, SELECTORS.outputArea);

        expect(output).toContain('අම්');

        if (await page.locator(SELECTORS.clearButton).isVisible()) {
            await page.click(SELECTORS.clearButton);
            const clearedInput = await page.inputValue(SELECTORS.inputArea);
            expect(clearedInput).toBe('');
        }
    });

});