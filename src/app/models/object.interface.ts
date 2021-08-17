export interface IObject {
  /** Identifying number for each artwork (unique, can be used as key field) */
  objectID: number;
  /** When "true" indicates a popular and important artwork in the collection */
  isHighlight: boolean;
  /** Identifying number for each artwork (not always unique) */
  accessionNumber: string;
  /** Year the artwork was acquired */
  accessionYear: string;
  /** When "true" indicates an artwork in the Public Domain */
  isPublicDomain: boolean;
  /** URL to the primary image of an object in JPEG format */
  primaryImage: string;
  /** URL to the lower-res primary image of an object in JPEG format */
  primaryImageSmall: string;
  /** An array containing URLs to the additional images of an object in JPEG format */
  additionalImages: string[];
  /**
   * An array containing the constituents associated with an object, with the constituent's
   * role, name, ULAN URL, Wikidata URL, and gender, when available (currently contains
   * female designations only) */
  constituents: {
    constituentID: number;
    role: string;
    name: string;
    constituentULAN_URL: string;
    constituentWikidata_URL: string;
  }[] | null;
  /** Indicates The Met's curatorial department responsible for the artwork */
  department: string;
  /** Describes the physical type of the object */
  objectName: string;
  /** Title, identifying phrase, or name given to a work of art */
  title: string;
  /** Information about the culture, or people from which an object was created */
  culture: string;
  /** Time or time period when an object was created */
  period: string;
  /** Dynasty (a succession of rulers of the same line or family) under which an
   * object was created */
  dynasty: string;
  /** Reign of a monarch or ruler under which an object was created */
  reign: string;
  /** A set of works created as a group or published as a series */
  portfolio: string;
  /**	Role of the artist related to the type of artwork or object that was created */
  artistRole: string;
  /** Describes the extent of creation or describes an attribution qualifier to the
   * information given in the artistRole field */
  artistPrefix: string;
  /** Artist name in the correct order for display */
  artistDisplayName: string;
  /** Nationality and life dates of an artist, also includes birth and death city when known */
  artistDisplayBio: string;
  /**	Used to record complex information that qualifies the role of a constituent,
   * e.g. extent of participation by the Constituent (verso only, and followers) */
  artistSuffix: string;
  /**	Used to sort artist names alphabetically. Last Name, First Name, Middle Name,
   * Suffix, and Honorific fields, in that order */
  artistAlphaSort: string;
  /** National, geopolitical, cultural, or ethnic origins or affiliation of the creator or
   * institution that made the artwork */
  artistNationality: string;
  /** Year the artist was born */
  artistBeginDate: string;
  /**	Year the artist died */
  artistEndDate: string;
  /** Gender of the artist (currently contains female designations only) */
  artistGender: string;
  /** Wikidata URL for the artist */
  artistWikidata_URL: string;
  /** ULAN URL for the artist */
  artistULAN_URL: string;
  /**	Year, a span of years, or a phrase that describes the specific or approximate date
   * when an artwork was designed or created */
  objectDate: string;
  /**	Machine readable date indicating the year the artwork was started to be created */
  objectBeginDate: number;
  /** Machine readable date indicating the year the artwork was completed (may be the
   * same year or different year than the objectBeginDate) */
  objectEndDate: number;
  /** Refers to the materials that were used to create the artwork */
  medium: string;
  /** Size of the artwork or object */
  dimensions: string;
  /** Array of elements, each with a name, description, and set of measurements.
   *  Spatial measurements are in centimeters; weights are in kg */
  measurements: {
    elementName: string;
    elementDescription: string;
    elementMeasurements: {
      Height: number;
      Length: number;
      Width: number;
    }
  }[] | null;
  /** Text acknowledging the source or origin of the artwork and the year the
   *  object was acquired by the museum */
  creditLine: string;
  /** Qualifying information that describes the relationship of the place catalogued
   *  in the geography fields to the object that is being catalogued */
  geographyType: string;
  /** City where the artwork was created */
  city: string;
  /** State or province where the artwork was created, may sometimes overlap with County */
  state: string;
  /** County where the artwork was created, may sometimes overlap with State */
  county: string;
  /** Country where the artwork was created or found */
  country: string;
  /** Geographic location more specific than country, but more specific than subregion,
   *  where the artwork was created or found (frequently null)
   * */
  region: string;
  /** Geographic location more specific than Region, but less specific than Locale,
   *  where the artwork was created or found (frequently null)
   * */
  subregion: string;
  /** Geographic location more specific than subregion, but more specific than locus,
   * where the artwork was found (frequently null) */
  locale: string;
  /** Geographic location that is less specific than locale, but more specific than
   * excavation, where the artwork was found (frequently null) */
  locus: string;
  /** The name of an excavation. The excavation field usually includes dates of excavation */
  excavation: string;
  /** River is a natural watercourse, usually freshwater, flowing toward an ocean, a lake,
   * a sea or another river related to the origins of an artwork (frequently null) */
  river: string;
  /** General term describing the artwork type */
  classification: string;
  /** Credit line for artworks still under copyright */
  rightsAndReproductions: string;
  /** URL to object's page on metmuseum.org */
  linkResource: string;
  /** Date metadata was last updated */
  metadataDate: string;
  repository: string;
  /** URL to object's page on metmuseum.org */
  objectURL: string;
  /** 	An array of subject keyword tags associated with the object and their respective AAT URL */
  tags: {
    term: string;
    "AAT_URL": string;
    "Wikidata_URL": string;
  }[] | null;
  /** Wikidata URL for the object */
  objectWikidata_URL: string;
  /** Whether the object is on the Timeline of Art History website */
  isTimelineWork: boolean;
  /**	Gallery number, where available */
  GalleryNumber: string;
}
