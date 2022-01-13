const embedCtrl = require('../../controllers/embed.ctrl');
const consoleLogger = require('../../logger/logger.js').console;

describe('Embed', () => {
    test('Successful response from getEmbed', async () => {
        let recordIdentifier = 'HUAM140429_URN-3:HUAM:INV012574P_DYNMC';
        try {
          embed = await embedCtrl.getEmbed(recordIdentifier);
        } catch (e) {
          const errorMsg = `Unable to validate getEmbed: ${e}`;
          consoleLogger.error(errorMsg);
        }
    
        expect(embed).not.toBeNull();
    });
    test('Unsuccessful response from getEmbed', async () => {
        let recordIdentifier = '12345';
        try {
          embed = await embedCtrl.getEmbed(recordIdentifier);
        } catch (e) {
          const errorMsg = `Unable to validate getEmbed: ${e}`;
          consoleLogger.error(errorMsg);
        }
    
        expect(embed).not.toBeNull();
    });
   
});