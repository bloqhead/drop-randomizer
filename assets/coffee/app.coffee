###!
# Drop Randomizer
#
# Modeled after the drops in the
# Borderlands video game series.
#
###

$ =>
  window.RandomDrop = new window.DropRandomizer()
  window.RandomDropTimer = setInterval window.RandomDrop.NextDrop, 30000

class window.DropRandomizer

  constructor : ->
    @DropTemplate = _.template $('#random-drop-template').html()
    @DropTemplateContainer = $('.randomized-drop')
    @DropSpecialDescriptor = $('.drop__special-descriptor')
    @DropAttributeMutator = $('.drop__attribute-mutator')
    @DropWeaponType = $('.drop__weapon-type')
    @DropWeaponManufacturer = $('.drop__weapon-manufacturer')
    # @DropSpecialDescriptorValues = [
    #   "Hard", "Large", "Awesome", "Fat", "Carl's", "Charlie's", "Joe's", "Unkempt", "Dirty", "Ridiculous", "Fabulous"
    # ]
    @DropSpecialDescriptorValues = [
      "Ablaze", "Abrupt", "Accomplished", "Active", "Amusing", "Animal-like", "Antique", "Archaic", "Ardent", "Arrogant", "Authoritative", "Awestruck", "Bewitching", "Boisterous", "Booming", "Breathtaking", "Brilliant", "Calming", "Celestial", "Charming", "Cheerful", "Cherished", "Chilled", "Comical", "Commanding", "Companionable", "Confident", "Contentment", "Courage", "Crazy", "Creepy", "Dancing", "Dazzling", "Delicate", "Delightful", "Demented", "Desirable", "Determined", "Devoted", "Dominant", "Dramatic", "Drawn out", "Dripping", "Dumbstruck", "Ebullient", "Elated", "Elegant", "Enchanted", "Energetic", "Enthusiastic", "Ethereal", "Exaggerated", "Exalted", "Expectant", "Expressive", "Exuberant", "Faint", "Fantastical", "Favorable", "Febrile", "Feral", "Feverish", "Fiery", "Floating", "Flying", "Folksy", "Fond", "Forgiven", "Forgiving", "Freakin' awesome", "Frenetic", "Frenzied", "Friendly. amorous", "From a distance", "Frosted", "Funny", "Furry", "Galloping", "Gaping", "Gentle", "Giddy", "Glacial", "Gladness", "Gleaming", "Gleeful", "Gorgeous", "Graceful", "Grateful", "Halting", "Happy", "Haunting", "Heavenly", "Hidden", "High-spirited", "Honor", "Hopeful", "Hopping", "Humble", "Hushed", "Hypnotic", "Illuminated", "Immense", "Imperious", "Impudent", "In charge", "Inflated", "Innocent", "Inspired", "Intimate", "Intrepid", "Jagged", "Joking", "Joyful", "Jubilant", "Kindly", "Languid", "Larger than life", "Laughable", "Lickety-split", "Lighthearted", "Limping", "Linear", "Lively", "Lofty", "Love of", "Lovely", "Lulling", "Luminescent", "Lush", "Luxurious", "Magical", "Maniacal", "Manliness", "March-like", "Masterful", "Merciful", "Merry", "Mischievous", "Misty", "Modest", "Moonlit", "Mysterious", "Mystical", "Mythological", "Nebulous", "Nostalgic", "On fire", "Overstated", "Paganish", "Partying", "Perfunctory", "Perky", "Perplexed", "Persevering", "Pious", "Playful", "Pleasurable", "Poignant", "Portentous", "Posh", "Powerful", "Pretty", "Prickly", "Prideful", "Princesslike", "Proud", "Puzzled", "Queenly", "Questing", "Quiet", "Racy", "Ragged", "Regal", "Rejoicing", "Relaxed", "Reminiscent", "Repentant", "Reserved", "Resolute", "Ridiculous", "Ritualistic", "Robust", "Running", "Sarcastic", "Scampering", "Scoffing", "Scurrying", "Sensitive", "Serene", "Shaking", "Shining", "Silky", "Silly", "Simple", "Singing", "Skipping", "Smooth", "Sneaky", "Soaring", "Sophisticated", "Sparkling", "Spell-like", "Spherical", "Spidery", "Splashing", "Splendid", "Spooky", "Sprinting", "Starlit", "Starry", "Startling", "Successful", "Summery", "Surprised", "Sympathetic", "Tapping", "Teasing", "Tender", "Thoughtful", "Thrilling", "Tingling", "Tinkling", "Tongue-in-cheek", "Totemic", "Touching", "Tranquil", "Treasured", "Trembling", "Triumphant", "Twinkling", "Undulating", "Unruly", "Urgent", "Veiled", "Velvety", "Victorious", "Vigorous", "Virile", "Walking", "Wild", "Witty", "Wondering", "Zealous", "Zestful"
    ]
    @DropAttributeMutatorValues = [
      "Corrosive", "Explosive", "Incendiary", "Shock", "Slag"
    ]
    # @DropAttributeMutatorValues = [
    #   {
    #     'attribute' : 'Corrosive'
    #     'color'     : '#37AB40'
    #   }
    #   {
    #     'attribute' : 'Explosive'
    #     'color'     : '#489A00'
    #   }
    #   {
    #     'attribute' : 'Incendiary'
    #     'color'     : '#C34F00'
    #   }
    #   {
    #     'attribute' : 'Shock'
    #     'color'     : '#008ED8'
    #   }
    #   {
    #     'attribute' : 'Slag'
    #     'color'     : '#008ED8'
    #   }
    # ]
    @DropWeaponTypeValues = [
      "Machine Pistol", "Sniper Rifle", "Submachine Gun", "Repeater", "Revolver", "Combat Rifle", "Shotgun", "Rocket Launcher", "Grenade Launcher", "Knife", "Sword", "Club"
    ]
    @DropWeaponManufacturerValues = [
      "Atlas", "Dahl", "Eridian", "Hyperion", "Jakobs", "Maliwan", "S&amp;S Munitions", "Tediore", "Torgue", "Vladof"
    ]

    # Display a randomized weapon on load
    @NextDrop()

    # Cycle to the next random drop
    $(window).on 'keyup', (e) =>
      @NextDrop() if e.keyCode is 39

  ### Drop cycling ###
  NextDrop : ->
    TheDrop = @WeaponCreator()
    @DropTemplateContainer.html @DropTemplate( TheDrop )
    @DatabaseEntries( TheDrop )

  ### Name randomizer ###
  Randomizer : (items) ->
    items[ _.random( items.length-1 ) ]

  ### Weapon creation ###
  WeaponCreator : ->
    output =
      descriptor: @Randomizer(@DropSpecialDescriptorValues)
      mutator: @Randomizer(@DropAttributeMutatorValues)
      type: @Randomizer(@DropWeaponTypeValues)
      manufacturer: @Randomizer(@DropWeaponManufacturerValues)

    return output

  ### Database entries ###
  # @TODO: need to get this working properly
  DatabaseEntries : (output) ->
    DropDatabase = new PouchDB 'drops'

    DropDatabase.put
      _id: output.descriptor + output.mutator + output.type
      descriptor: output.descriptor
      mutator: output.mutator
      type: output.type

    DropDatabase.replicate.to 'http://droprandomizer.local/drops'

$ -> new DropRandomizer jQuery
