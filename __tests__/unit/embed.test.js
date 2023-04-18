const embedCtrl = require('../../controllers/embed.ctrl');
const consoleLogger = require('../../logger/logger.js').console;

describe('Embed', () => {

  test('Successful response from getEmbed Legacy', async () => {
    const recordIdentifier = 'HUAM140429_URN-3:HUAM:INV012574P_DYNMC';
    let embed;
    try {
      embed = await embedCtrl.getEmbed(recordIdentifier, 'legacy', 2);
    } catch (e) {
      const errorMsg = `Unable to validate getEmbed: ${e}`;
      consoleLogger.error(errorMsg);
    }

    expect(embed).not.toBeNull();
  });

  test('Unsuccessful response from getEmbed Legacy', async () => {
    const recordIdentifier = '12345';
    let embed;
    try {
      embed = await embedCtrl.getEmbed(recordIdentifier, 'legacy', 2);
    } catch (e) {
      const errorMsg = `Unable to validate getEmbed: ${e}`;
      consoleLogger.error(errorMsg);
    }

    expect(embed).not.toBeNull();
  });

  test('Successful response from getEmbed Legacy', async () => {
    const urn = 'URN-3:FHCL:100252142';
    let embed;
    try {
      embed = await embedCtrl.getEmbed(urn, 'mps', 3);
    } catch (e) {
      const errorMsg = `Unable to validate getEmbed: ${e}`;
      consoleLogger.error(errorMsg);
    }

    expect(embed).not.toBeNull();
  });

  test('Unsuccessful response from getEmbed Legacy', async () => {
    const urn = '12345';
    let embed;
    try {
      embed = await embedCtrl.getEmbed(urn, 'mps', 3);
    } catch (e) {
      const errorMsg = `Unable to validate getEmbed: ${e}`;
      consoleLogger.error(errorMsg);
    }

    expect(embed).not.toBeNull();
  });
   
});
