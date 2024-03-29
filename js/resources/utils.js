/*
HOW TO USE IN CONTENT SCRIPTS:

(async () => {
  let Utilities = await import(chrome.runtime.getURL('/js/resources/utils.js'));
  Utilities = Utilities.default
})();
*/

function ParseFullNumber(ab) {
  if (typeof(ab) === "number") { return ab }
  const Suffixes = {"k": 1000, "m": 1000000, "b": 1000000000}
  const Suffix = ab.slice(-1).toLowerCase();
  if (Suffixes[Suffix]) {return parseFloat(ab)*Suffixes[Suffix]} else {return parseFloat(ab)}
}

export default {
  DefaultSettings: {
    PinnedGamesOn: true,
    ForumMentsOn: true,
    BestFriendsOn: false,
    ImprovedFrListsOn: false,
    IRLPriceWithCurrencyOn: true,
    IRLPriceWithCurrencyCurrency: 0,
    IRLPriceWithCurrencyPackage: 0,
    HideNotifBadgesOn: false,
    StoreOwnTagOn: true,
    ThemeCreatorOn: false,
    ThemeCreator: {
      BGColor: null,
      BGImage: null,
      BGImageSize: 'fit',
      PrimaryTextColor: null,
      SecondaryTextColor: null,
      LinkTextColor: null,
      WebsiteLogo: null
    },
    ModifyNavOn: false,
    ModifyNav: [
      {
        Label: "Play",
        Link: "https://polytoria.com/places"
      },
      {
        Label: "Store",
        Link: "https://polytoria.com/store"
      },
      {
        Label: "Guilds",
        Link: "https://polytoria.com/guilds"
      },
      {
        Label: "People",
        Link: "https://polytoria.com/users"
      },
      {
        Label: "Forum",
        Link: "https://polytoria.com/forum"
      }
    ],
    MoreSearchFiltersOn: true,
    ApplyMembershipThemeOn: false,
    ApplyMembershipThemeTheme: 0,
    MultiCancelOutTradesOn: true,
    ItemWishlistOn: true,
    HideUpgradeBtnOn: false
  },
  CalculateIRL: async function(bricks, to, brickPackage) {
    /*
    Disabled for now: currency retrieval from currencies.json

    const response = await fetch(chrome.runtime.getURL('/js/resources/currencies.json'))
    if (!response.ok) {
      throw new Error('Getting currency data failure')
    }
    const data = await response.json()
    const UnitPrice = data.Data[brickPackage][to]
    */

    let Result = "N/A";
    let Display = "Currency Not Found";

    bricks = ParseFullNumber(bricks.replace(/,/g, ''))
    console.log(bricks)
    switch (to) {
      // U.S. Dollar
      case 0:
        Result = (bricks * 0.0099).toFixed(2)
        Display = "USD"
        break

      // Euro
      case 1:
        Result = (bricks.replace(/,/g, '') * 0.009).toFixed(2)
        Display = "EUR"
        break

      // Canadian Dollar
      case 2:
        Result = (bricks.replace(/,/g, '') * 0.0131).toFixed(2)
        Display = "CAD"
        break

      // Great British Pound
      case 3:
        Result = (bricks.replace(/,/g, '') * 0.0077).toFixed(2)
        Display = "GBP"
        break

      // Mexican Peso
      case 4:
        Result = (bricks.replace(/,/g, '') * 0.1691).toFixed(2)
        Display = "MXN"
        break

      // Australia Dollar
      case 5:
        Result = (bricks.replace(/,/g, '') * 0.0144).toFixed(2)
        Display = "AUD"
        break

      // Turkish Lira
      case 6:
        Result = (bricks.replace(/,/g, '') *  0.2338).toFixed(2)
        Display = "TRY"
        break

      // Brazillian Real
      case 7:
        Result = (bricks.replace(/,/g, '') * 0.49).toFixed(2)
        Display = "BRL"
        break
    }

    if (typeof(Result) === "number") { Result = Result.toFixed(2) }

    return {
      result: Result,
      display: Display
    }
  }
}
