
/*!
 * Drop Randomizer
 *
 * Modeled after the drops in the
 * Borderlands video game series.
 *
 */

(function() {
  $((function(_this) {
    return function() {
      window.RandomDrop = new window.DropRandomizer();
      return window.RandomDropTimer = setInterval(window.RandomDrop.NextDrop, 30000);
    };
  })(this));

  window.DropRandomizer = (function() {
    function DropRandomizer() {
      this.DropTemplate = _.template($('#random-drop-template').html());
      this.DropTemplateContainer = $('.randomized-drop');
      this.DropSpecialDescriptor = $('.drop__special-descriptor');
      this.DropAttributeMutator = $('.drop__attribute-mutator');
      this.DropWeaponType = $('.drop__weapon-type');
      this.DropWeaponManufacturer = $('.drop__weapon-manufacturer');
      this.DropSpecialDescriptorValues = ["Ablaze", "Abrupt", "Accomplished", "Active", "Amusing", "Animal-like", "Antique", "Archaic", "Ardent", "Arrogant", "Authoritative", "Awestruck", "Bewitching", "Boisterous", "Booming", "Breathtaking", "Brilliant", "Calming", "Celestial", "Charming", "Cheerful", "Cherished", "Chilled", "Comical", "Commanding", "Companionable", "Confident", "Contentment", "Courage", "Crazy", "Creepy", "Dancing", "Dazzling", "Delicate", "Delightful", "Demented", "Desirable", "Determined", "Devoted", "Dominant", "Dramatic", "Drawn out", "Dripping", "Dumbstruck", "Ebullient", "Elated", "Elegant", "Enchanted", "Energetic", "Enthusiastic", "Ethereal", "Exaggerated", "Exalted", "Expectant", "Expressive", "Exuberant", "Faint", "Fantastical", "Favorable", "Febrile", "Feral", "Feverish", "Fiery", "Floating", "Flying", "Folksy", "Fond", "Forgiven", "Forgiving", "Freakin' awesome", "Frenetic", "Frenzied", "Friendly. amorous", "From a distance", "Frosted", "Funny", "Furry", "Galloping", "Gaping", "Gentle", "Giddy", "Glacial", "Gladness", "Gleaming", "Gleeful", "Gorgeous", "Graceful", "Grateful", "Halting", "Happy", "Haunting", "Heavenly", "Hidden", "High-spirited", "Honor", "Hopeful", "Hopping", "Humble", "Hushed", "Hypnotic", "Illuminated", "Immense", "Imperious", "Impudent", "In charge", "Inflated", "Innocent", "Inspired", "Intimate", "Intrepid", "Jagged", "Joking", "Joyful", "Jubilant", "Kindly", "Languid", "Larger than life", "Laughable", "Lickety-split", "Lighthearted", "Limping", "Linear", "Lively", "Lofty", "Love of", "Lovely", "Lulling", "Luminescent", "Lush", "Luxurious", "Magical", "Maniacal", "Manliness", "March-like", "Masterful", "Merciful", "Merry", "Mischievous", "Misty", "Modest", "Moonlit", "Mysterious", "Mystical", "Mythological", "Nebulous", "Nostalgic", "On fire", "Overstated", "Paganish", "Partying", "Perfunctory", "Perky", "Perplexed", "Persevering", "Pious", "Playful", "Pleasurable", "Poignant", "Portentous", "Posh", "Powerful", "Pretty", "Prickly", "Prideful", "Princesslike", "Proud", "Puzzled", "Queenly", "Questing", "Quiet", "Racy", "Ragged", "Regal", "Rejoicing", "Relaxed", "Reminiscent", "Repentant", "Reserved", "Resolute", "Ridiculous", "Ritualistic", "Robust", "Running", "Sarcastic", "Scampering", "Scoffing", "Scurrying", "Sensitive", "Serene", "Shaking", "Shining", "Silky", "Silly", "Simple", "Singing", "Skipping", "Smooth", "Sneaky", "Soaring", "Sophisticated", "Sparkling", "Spell-like", "Spherical", "Spidery", "Splashing", "Splendid", "Spooky", "Sprinting", "Starlit", "Starry", "Startling", "Successful", "Summery", "Surprised", "Sympathetic", "Tapping", "Teasing", "Tender", "Thoughtful", "Thrilling", "Tingling", "Tinkling", "Tongue-in-cheek", "Totemic", "Touching", "Tranquil", "Treasured", "Trembling", "Triumphant", "Twinkling", "Undulating", "Unruly", "Urgent", "Veiled", "Velvety", "Victorious", "Vigorous", "Virile", "Walking", "Wild", "Witty", "Wondering", "Zealous", "Zestful"];
      this.DropAttributeMutatorValues = ["Corrosive", "Explosive", "Incendiary", "Shock", "Slag"];
      this.DropWeaponTypeValues = ["Machine Pistol", "Sniper Rifle", "Submachine Gun", "Repeater", "Revolver", "Combat Rifle", "Shotgun", "Rocket Launcher", "Grenade Launcher", "Knife", "Sword", "Club"];
      this.DropWeaponManufacturerValues = ["Atlas", "Dahl", "Eridian", "Hyperion", "Jakobs", "Maliwan", "S&amp;S Munitions", "Tediore", "Torgue", "Vladof"];
      this.NextDrop();
      $(window).on('keyup', (function(_this) {
        return function(e) {
          if (e.keyCode === 39) {
            return _this.NextDrop();
          }
        };
      })(this));
    }


    /* Drop cycling */

    DropRandomizer.prototype.NextDrop = function() {
      var TheDrop;
      TheDrop = this.WeaponCreator();
      this.DropTemplateContainer.html(this.DropTemplate(TheDrop));
      return this.DatabaseEntries(TheDrop);
    };


    /* Name randomizer */

    DropRandomizer.prototype.Randomizer = function(items) {
      return items[_.random(items.length - 1)];
    };


    /* Weapon creation */

    DropRandomizer.prototype.WeaponCreator = function() {
      var output;
      output = {
        descriptor: this.Randomizer(this.DropSpecialDescriptorValues),
        mutator: this.Randomizer(this.DropAttributeMutatorValues),
        type: this.Randomizer(this.DropWeaponTypeValues),
        manufacturer: this.Randomizer(this.DropWeaponManufacturerValues)
      };
      return output;
    };


    /* Database entries */

    DropRandomizer.prototype.DatabaseEntries = function(output) {
      var DropDatabase;
      DropDatabase = new PouchDB('drops');
      DropDatabase.put({
        _id: output.descriptor + output.mutator + output.type,
        descriptor: output.descriptor,
        mutator: output.mutator,
        type: output.type
      });
      return DropDatabase.replicate.to('http://droprandomizer.local/drops');
    };

    return DropRandomizer;

  })();

  $(function() {
    return new DropRandomizer(jQuery);
  });

}).call(this);
