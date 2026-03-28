"use client"

// Gallery Navigation Component - Updated
import Image from "next/image"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// Import full project proposal content
import { projectProposalContent, projectProposalTables } from "@/lib/proposal-content"

// Table component for styled tables with alternating colors
function StyledTable({ headers, rows }: { headers: string[], rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-white text-black">
            {headers.map((header, i) => (
              <th key={i} className="border border-white/30 px-4 py-3 text-left font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-black text-white" : "bg-white/10 text-white"}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-white/30 px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Parse and render structured content
function ContentRenderer({ content, tables }: { content: string, tables?: { marker: string, headers: string[], rows: string[][] }[] }) {
  
  // Function to render a text block with proper formatting
  const renderTextBlock = (text: string, blockKey: string) => {
    // Split into paragraphs
    const paragraphs = text.split('\n\n').filter(p => p.trim())
    
    return paragraphs.map((para, paraIndex) => {
      const trimmedPara = para.trim()
      
      // Check if it's a section header (short line, no bullet, often ends with colon or is title-like)
      // Exclude specific lines that should be small text
      const isSmallText = trimmedPara.match(/^(Our approach is built on three pillars:|Activities that can be offered for support and structure:|Ali von Stein|A slow but scenic local train|V - Sustainability|Program and Activities)/i)
      const isHeader = (
        !isSmallText &&
        trimmedPara.length < 80 && 
        !trimmedPara.startsWith('•') && 
        (trimmedPara.match(/^(The |A |I+ - |Preparing|Grounding|Budget|Capacity|Experience|Structures and Solutions|Call to Action|Conclusion|Unique Points and Benefits|Place and Environment|Financials|Benefits and Marketing|Qualification and Experience)/i) ||
         trimmedPara.match(/^\d+\.\s/))
      )
      
      // Check if paragraph contains bullet points
      const hasBullets = trimmedPara.includes('\n•') || trimmedPara.startsWith('•')
      
      if (isHeader) {
        return (
          <h3 key={`${blockKey}-${paraIndex}`} className="text-white text-xl md:text-2xl font-light mt-8 mb-3 tracking-widest">
            {trimmedPara}
          </h3>
        )
      }
      
      if (hasBullets) {
        // Split into intro text and bullet items
        const lines = trimmedPara.split('\n')
        const introLines: string[] = []
        const bulletItems: string[] = []
        
        lines.forEach(line => {
          if (line.trim().startsWith('•')) {
            bulletItems.push(line.trim().substring(1).trim())
          } else if (bulletItems.length === 0 && line.trim()) {
            introLines.push(line.trim())
          }
        })
        
        return (
          <div key={`${blockKey}-${paraIndex}`} className="mb-5">
            {introLines.length > 0 && (
              <p className="text-white/80 text-sm md:text-base mb-3 text-justify">{introLines.join(' ')}</p>
            )}
            <ul className="space-y-2 ml-1">
              {bulletItems.map((item, bulletIndex) => (
                <li key={bulletIndex} className="flex items-start gap-3 text-white/80 text-sm md:text-base">
                  <span className="text-white/50 mt-1 text-[10px]">●</span>
                  <span className="text-justify">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      }
      
      // Regular paragraph
      return (
        <p key={`${blockKey}-${paraIndex}`} className="text-white/80 text-sm md:text-base mb-4 leading-relaxed text-justify">
          {trimmedPara}
        </p>
      )
    })
  }
  
  // Handle tables if present
  if (!tables || tables.length === 0) {
    return <div className="font-light">{renderTextBlock(content, 'main')}</div>
  }
  
  // Split content by table markers and render tables in place
  let parts: { type: 'text' | 'table', content: string, tableIndex?: number }[] = [{ type: 'text', content }]
  
  tables.forEach((table, tableIndex) => {
    const newParts: { type: 'text' | 'table', content: string, tableIndex?: number }[] = []
    parts.forEach((part) => {
      if (part.type === 'text' && part.content.includes(table.marker)) {
        const [before, after] = part.content.split(table.marker)
        if (before?.trim()) newParts.push({ type: 'text', content: before })
        newParts.push({ type: 'table', content: '', tableIndex })
        if (after?.trim()) newParts.push({ type: 'text', content: after })
      } else {
        newParts.push(part)
      }
    })
    parts = newParts
  })
  
  return (
    <div className="font-light">
      {parts.map((part, i) => 
        part.type === 'table' && tables[part.tableIndex!] ? (
          <StyledTable 
            key={`table-${i}`} 
            headers={tables[part.tableIndex!].headers} 
            rows={tables[part.tableIndex!].rows} 
          />
        ) : (
          <div key={`text-${i}`}>{renderTextBlock(part.content, `block-${i}`)}</div>
        )
      )}
    </div>
  )
}

export const galleryItems = [
  {
    id: "project-proposal",
    title: "the project proposal",
    image: "/images/hero-landscape.jpg",
    content: projectProposalContent,
    tables: projectProposalTables
  },
  {
    id: "problem-science",
    title: "the problem   -   the science",
    image: "/images/gallery-nav-1.jpg",
    content: "The Problem: Context and Pathology\n\nToday's world presents creatives with significant challenges, amplified by the pressures in the complex force fields of urban environments. The contemporary creative economy demands relentless output, subjecting artists, writers, musicians, and performers to unprecedented levels of pressure. The results often are burnout and creative stagnation.\n\nExisting access to support is limited and often non-aligned with individual needs; hence numerous promising careers stall and sink. We have experienced, researched, and understood the \"Creative Pathology\" that affects our target group. We are part of it.\n\nThe outcome-driven environment of today's marketplace keeps the artist under \"Goal-Oriented Pressure\" and makes \"Creative Flow\" elusive. When playfulness, inner silence and the ability to listen are lost, inspiration dries up and creativity shrinks. What used to be a calling starts to feel like a struggle for survival.\n\nThe Science: Evidence of Crisis\n\n1. The \"Creative Paradox\": Scientific literature consistently identifies a \"U-shaped\" relationship between high creativity and emotional vulnerability.\n\n• Prevalence of Disorders: A landmark study of over 1 million people (S. Kyaga et al. 2012) and subsequent longitudinal follow-ups indicate that creative professionals are 8% to 18% more likely to experience bipolar disorder and depressive episodes compared to the general population.\n\n• The \"Openness\" Penalty: The personality trait Openness to Experience, essential for artists, is statistically correlated with thin boundaries, meaning creatives absorb environmental stress and emotional stimuli more deeply than the average worker.\n\n• Performance Anxiety (MPA): Studies on Music Performance Anxiety (MPA) show that up to 70% of professional musicians experience anxiety that impairs their physical ability to perform, leading to a cycle of substance use as a \"self-medication\" strategy.\n\n2. The Burnout Mechanics (2019-2026): Burnout in the creative sector differs from \"white-collar\" burnout because the artist's identity is inseparable from their output.\n\n• Identity Fusion: When a project fails or a \"block\" occurs, the creative professional experiences it as an existential threat, not a professional setback. Research calls this \"Self-Complexity Deficit.\"\n\n• The Gig Economy Stressor: A 2022 study on the \"Precariat\" (precarious proletariat) in the arts found that the lack of financial predictability triggers the Amygdala (the brain's fear centre) into a state of chronic activation. This inhibits the Prefrontal Cortex, effectively \"shutting down\" the ability to think divergently or creatively.\n\n• Digital Exhaustion: Recent studies (2024+) on \"Algorithmic Anxiety\" show that the pressure to be constantly visible on social media (The \"Content Treadmill\") has created a new subset of burnout characterised by Creative Mimicry, artists stop innovating and start imitating what the algorithm rewards, leading to a loss of \"Artistic Self.\"\n\n3. Professional Challenges: The \"Always-On\" Culture\nThe creative industries have transitioned into a high-speed, high-volume environment that is biologically unsustainable.\n\n[[TABLE_ALWAYS_ON]]\n\n4. The Science of \"Regeneration\" (The Solution): Studies on Attention Restoration Theory (ART) and Environmental Psychology provide the scientific backing for our approach.\n\n• The \"Soft Fascination\" Effect: Research shows that \"Hard Fascination\" (screens, city traffic) exhausts the brain. \"Soft Fascination\" (looking at the Atlantic Ocean, mountain ridge lines in Asturias/Galicia) allows the Default Mode Network (DMN) to engage. The DMN is the brain state where Incubation and creative \"Aha!\" moments occur.\n\n• Nature and Neural Plasticity: 90 minutes of walking in a natural environment (vs. urban) results in decreased activity in the subgenual Prefrontal Cortex, the area associated with morbid rumination and depression.\n\n• The Power of \"Unstructured Time\": New research into Cognitive Decoupling suggests that deliberate \"Downtime\" isn't passive; it's a highly active state where the brain reorganises complex information. Without it, creative \"breakthroughs\" are statistically less likely.",
    tables: [
      {
        marker: "[[TABLE_ALWAYS_ON]]",
        headers: ["Challenge", "Impact on Brain", "Scientific Insight"],
        rows: [
          ["Monetization of Self", "Chronic Cortisol Elevation", "Constant self-promotion treats the \"Self\" as a product, leading to Depersonalization."],
          ["Irregular Circadian Rhythms", "REM Sleep Deprivation", "Performance and production schedules disrupt sleep, which is the primary period for Neural Pruning and creative synthesis."],
          ["Isolation vs. Scrutiny", "Social Rejection Pain", "Creatives work in isolation (High loneliness) then face instant public critique (High social pain). The brain processes social rejection in the same area as Physical Pain."]
        ]
      }
    ]
  },
  {
    id: "gap-vision",
    title: "the gap   -   the vision",
    image: "/images/gallery-nav-2.jpg",
    content: `The Gap: The Solution Lies Deeper

With this awareness, the question arises: Can we reignite artistic growth?

Traditional retreats, often characterised by rigid schedules and inadequate facilities, fail to address the core issue. When creatives perceive their activities as "Work," with all the judgments that entails, any structure that forces them into new activities in the name of creativity (like a mandatory painting course) will just be experienced as more "Work."

The artist's way is, to a degree, a path of aloneness, in a positive sense. The idea is to operate in an atmosphere where one feels safe to unwind, to let go of the constructs of one's life as "someone", and to just be.

The Vision: From Goal to Flow

Paths and Passages provides a unique, long-form creative residency in the inspiring landscapes of Northern Spain. We offer a conscious pause, a holistic solution that de-pressurises the creative process, allowing high-potential talent to reconnect with their original sources.

By introducing a more playful approach to being, living, and working, we offer loose and inviting structures where goal orientation can shift to a more liquid, adaptable approach. "Goals and Targets" are replaced with "Moment to Moment." The collective pressures of ambition, power, and politics are left behind; the participant's inner drive takes over.`
  },
  {
    id: "philosophy-model",
    title: "the philosophy   -   the model",
    image: "/images/gallery-nav-3.jpg",
    content: `The Model: A Strategic Path

Our approach is built on three pillars:

• Autonomy and Choice: Providing the space to find the moment where creativity flows without effort.

• Deep Preparation: Using Active Meditation and Activities in Nature for physical and mental readiness.

• Professional Space: Dedicated, professional-grade facilities that cater to the individual needs of the artist.

This is not merely a vacation; it is a Strategic Investment that produces demonstrably higher quality work and renews career longevity. It justifies our premium offering to agencies, funding bodies, and corporations seeking to nurture elite talent.

The Philosophy: A Matter of the Heart

We understand that when you are not in fear, not pretending to be "somebody", the roots of life are available to you - the place where creativity truly grows. When that connection is broken, it can be difficult to find it again on your own in the wrong environment. Path and Passages exists to provide the shared support needed for that rediscovery.

The Heart of the Matter is a Matter of the Heart - our philosophy is a balance of open presence, that encourages self-regulation and the safety of a gentle supportive network in the background. Sometimes, simply knowing a support system exists is enough to let you be at ease; at other moments, the ability to engage and be understood is vital.

Preparing the Ground: The Creative Act

For an artist, preparing the ground - both inside the mind and outside in the environment - is essential. It provides the footing required to step into the unknown. When the body is clear and the mind is receptive, inspiration takes the initiative.

As an offering created by artists for artists, we understand the nuances of what helps and hinders the creative process. By providing a sensitive environment and professional-grade facilities, we help our guests to prepare internally and externally for creative acts to flow.

A Breathing Infrastructure

To support the journey, we offer the community a structured yet "liquid" environment:

• Integrated Support: Optional activities (i.e. active meditation, community work, and small workshops) run in the background as resources to be tapped into whenever needed. Individual programs can be tailored for the individual.

• Professional Facilities: High-quality studios designed for deep work, ensuring the physical workspace is as primed as the mind. They can change and adapt to the individual needs of our guests.

• Regenerative Living: Our site is sustained by permaculture; food is grown and harvested on-site, keeping us connected to the rhythms of the land.

• Creative Expansion: Beyond our studios, workshops and rehearsal spaces, later phases of the project will open regional land for dedicated Land Art projects.

Grounding in these practices creates a doorway to those "unknown spaces" where the best work begins.`
  },
  {
    id: "structures-solutions",
    title: "structures and solutions",
    image: "/images/gallery-nav-4.jpg",
    content: `Structures and Solutions

Participants shall stay for periods between one and six months.

"Path and Passages," will offer comprehensive facilities and a supportive environment tailored specifically for creatives including:

• Comfortable accommodations with private and communal living spaces. The living quarters will have attached bathrooms with showers.

• The professional facilities need to adapt to the requirements of the artists: fully-equipped studios and performance spaces.

• An offering of regular active meditation sessions to clear body and mind led by experienced facilitators.

• An offering of workshops furthering understanding and capabilities (phase 2).

• Opportunities for networking and collaboration with fellow creatives can happen naturally and spontaneously.

• Supportive environment (mentorship, workshops, meditation, wild natural environment, networking opportunities)

• Tailored programs for different types of creatives (artists, actors, musicians, dancers, writers) (phase 2)

Program and Activities: Activities that can be offered for support and structure:
• Hikes and Walks (also overnight)
• Swimming and Surfing
• Workshops
• Active Meditations
• Parcours, Running, Physical Education and Training
• Sauna and Sweat Lodge
• Permaculture Gardening and Food Production
• Land Art Projects`
  },
  {
    id: "qualification-experience",
    title: "qualification and experience",
    image: "/images/gallery-nav-5.jpg",
    content: `Ali von Stein

Experience as an artist
• Graffiti artist NYC, Germany 1983/84
• Guest student with Robin Page Munich
• Guest student with Michael Buthe Düsseldorf
• Visual artist in Cologne Germany 1985-88
• Opened an art studio on 2nd St in N.Y.C 1995
• Founded Play2C Performing Arts in Berlin 2007

Experience as an actor/director
• Training at HB-Studio NYC 2001-03
• Participated in various theater productions and films as actor and director in NYC and Berlin since 2003

Experience as a meditation teacher
• Created the Meditation Module N.Y.C. taught active meditation classes there. 2003-07
• Created the OSHO Meditation Studio Berlin and taught daily active meditation classes there. 2007-19
• Osho Meditation Lab Berlin 2019-23

Experience as an entrepreneur
• Meditation Module NYC 2003-2007
• OSHO Studio Berlin 2007-2019
• Play2C Performing Arts Berlin 2008-2017
• Tribes of Nothingness Meditation Retreats 2019-22`
  },
  {
    id: "unique-points",
    title: "unique points and methods",
    image: "/images/gallery-nav-6.jpg",
    content: `It is perhaps the most crucial part of this proposal: the transition from the "what" to the "why." Our argument is essentially that creativity is not a skill you apply, but a frequency you tune into.

By aligning with the "inside-out" approach, we signal to supporters that we are not running a craft camp, but are managing an ecosystem for the human spirit.

The Inner Architecture of Invention . . . most residencies focus on the output: the book, the painting, the performance. At Path and Passages, we recognise that the work is merely a by-product of a specific state of being.

Our approach aligns with a growing movement that views the artist as a "vessel." To create something truly new, one must first clear the vessel of the noise, the ego, the marketplace and the "force fields" of contemporary life. Providing a comfortable desk is not sufficient; we provide the conditions for using that comfortable desk with awareness.

We understand that the creative process follows a rhythm that cannot be forced, but can be invited. Our model mirrors the essential stages of discovery:

• The Void (Nothingness): Many artists fear the empty space. We celebrate it. By using Active Meditation and nature immersion, we help artists become comfortable in the "stillness" where original ideas actually begin.

• The Collector State: When an artist is relaxed and "moment-to-moment," they become a magnet for stimuli. A lush flora and the rhythm of the Atlantic are not just scenery; they can become stimuli / raw data for the subconscious to interact.

• Craft as Play: When the pressure of "Work" is removed, the studio becomes a place of play. This is where invention happens, not through effort, but through curiosity.`
  },
  {
    id: "place-environment",
    title: "place, environment and logistics",
    image: "/images/gallery-nav-7.jpg",
    content: `The Location is a patch of paradise on the wild and rugged Asturian coast in the North of Spain. The green hills and mountains form an approximately 30 km wide stretch of coast along the Atlantic Ocean. This is the region where the small town of Ribadesella can be found on the coast at the mouth of a river.

Cows graze on its evergreen meadows in the shade of chestnut, oak and eucalyptus trees where fruit, avocados, rosemary, laurel, corn and beans grow abundantly in the fertile soil.

The climate is oceanic, with cool summers and mild winters. Temperatures are rarely dropping below 5-7 degrees, even at night in the depth of winter. Clouds drifting in from the Ocean provide steady rain between the coast and the high mountain range of the 'Picos de Europa'. The abundance of water nourishes the continuous growth of a lush flora.

Surfers from all over the world meet on the beaches all year round attracted by the optimal conditions for their sport.

Different routes of the well known hiking path "Camino de Santiago" run through this region.

An excursion into the mountain range of the "Picos de Europa" that reaches 2500 m above sea level is just an hour's drive away.

The intense flora and the strong contrasts between mountains and coastline make for a rich and stimulating experience of the nature around you.

The choice of Northern Spain, specifically the area around Ribadesella is a practical one. The climate creates a lush, evergreen environment that feels alive year-round. There is a specific kind of energy in a place where high mountains meet the ocean and the stark contrasts within the landscape makes for an ongoing immersive experience.

The fertile soil allows us to grow our own food using permaculture methods, ensuring that what the artists eat is as restorative as the air they breathe. This connection to the land, harvesting vegetables or participating in Land Art projects, grounds the creative process in something tangible and real facilitating a shift from the "survival mode" and into a "creative mode" fuelled by the natural rhythms of the coast.

Capacity and Logistics

The initial capacity of the first year shall accommodate 15 participants at any given time in single or shared rooms. The capacity shall grow over five years to a maximum of 30 places for participants. The professional facilities need to grow in step with that.

The town of Ribadesella is 15 minutes by car from the location of the premises. The cities of Gijon (45 minutes) and Oviedo (60 minutes) can easily be reached by motorway.

The closest airports are Santander (SDR) and Asturias (OVD) with Santander airport being 1 1/4 hr and Asturias airport 1 hr by car from our location. Both airports have inexpensive car rental facilities attached.

There are AVE train stops in Oviedo and Gijon connecting Asturias with Madrid by a 3 1/2 hour train ride. A slow but scenic local train runs along the coast from Santander to Oviedo.`
  },
  {
    id: "financials-growth",
    title: "financials and growth plan",
    image: "/images/gallery-nav-8.jpg",
    content: `Financials: A Strategic Investment

Our goal is to be a permanent hub for the international creative community. We aren't just offering a one-off vacation; we are building a recurring resource for artists, agencies, and funding bodies who recognise that elite talent needs a specific kind of maintenance.

By providing the space, the autonomy, and the professional tools, we create a doorway to a refuge when the need arises.

Budget, Funding and Revenue

I - Capital Expenditures of Set-Up / Start-Up

[[TABLE_CAPITAL]]

II - Operating Expenditures

[[TABLE_OPERATING]]

III - Revenue Projections

Participants pay €100/day for room and board plus additional fees for studio use and materials.

Year 1: Average retreat length: 20 days | Studio fees: €400/participant
• 10-15 participants per retreat | Retreats per year: 6 | Average: 12
• Revenue per participant: €2.400 (board) + €400 (studio) = €2.800
• Annual Revenue: 12 × 6 × €2.800 = €201.600

Year 5: Average retreat length: 20 days | Studio fees: €400/participant
• Retreats per year: 8 | Average participants: 30
• Revenue per participant: €2.400 (board) + €400 (studio) = €2.800
• Annual Revenue: 30 × 8 × €2.800 = €576.000

IV - Growth Plan

[[TABLE_GROWTH]]

V - Sustainability & Additional Revenue Streams

To address the deficit in early years we are considering additional income streams:

• Corporate Retreats: Offer weekend workshops for organisations willing to pay premium rates.
• Grants and Sponsorships: Seek funding from art councils, cultural organisations, or private patrons.
• Seasonal Tourism Packages: Market facilities for short-term stays in off-seasons.
• Workshops: Charge external visitors for day-use workshops.`,
    tables: [
      {
        marker: "[[TABLE_CAPITAL]]",
        headers: ["Item", "Amount"],
        rows: [
          ["Purchase of Property and Land", "€ 500.000"],
          ["Sound Studio", "€ 50.000"],
          ["Artist Studios", "€ 75.000"],
          ["Meditation / Dance / Community Space", "€ 60.000"],
          ["Session Rooms", "€ 30.000"],
          ["Accommodation (10 double rooms with bathrooms)", "€ 250.000"],
          ["Kitchen Equipment", "€ 30.000"],
          ["Dining Area Furniture", "€ 15.000"],
          ["Small Van (6-9 Seats)", "€ 40.000"],
          ["Initial Stock (miscellaneous supplies)", "€ 10.000"],
          ["Permits and Legal Expenses", "€ 20.000"],
          ["Marketing and Networking", "€ 25.000"],
          ["Start-Up & Infrastructure Expenditures (Total)", "€ 1.105.000"]
        ]
      },
      {
        marker: "[[TABLE_OPERATING]]",
        headers: ["Item", "Year 1", "Year 5"],
        rows: [
          ["Salaries (staff, admin, facilitators - 5 FTEs)", "€ 150.000", "€ 250.000"],
          ["Utilities and Maintenance/Materials", "€ 30.000", "€ 50.000"],
          ["Food and Supplies", "€ 100.000", "€ 200.000"],
          ["Transportation", "€ 5.000", "€ 12.000"],
          ["Marketing / Networking", "€ 20.000", "€ 30.000"],
          ["Miscellaneous / Maintenance", "€ 20.000", "€ 58.000"],
          ["Total", "€ 325.000", "€ 600.000"]
        ]
      },
      {
        marker: "[[TABLE_GROWTH]]",
        headers: ["Year", "Participants", "Retreats", "Revenue", "Cost", "Net-Profit"],
        rows: [
          ["1", "12", "6", "€201.600", "€325.000", "-€123.400"],
          ["2", "15", "6", "€252.000", "€365.000", "-€113.000"],
          ["3", "20", "7", "€392.000", "€410.000", "-€18.000"],
          ["4", "25", "8", "€560.000", "€450.000", "€110.000"],
          ["5", "30", "8", "€672.000", "€600.000", "€172.000"]
        ]
      }
    ]
  },
  {
    id: "marketing-benefits",
    title: "marketing and benefits",
    image: "/images/gallery-nav-9.jpg",
    content: `Supporting this project can benefit you in various ways.

1. Private & Institutional Investors

For agencies, production houses, and record labels, your most valuable assets are the people. Burnout is a massive financial liability.

• Asset Protection: Investing in the residency is a way to protect "high-potential assets." By extending the career longevity of a top-tier artist, you protect their long-term earning potential.

• Quality of Output: An artist that is in "Flow" produces work of a significantly higher caliber. Investors benefit from the "Strategic Investment" that results in a more valuable end product (a better album, a stronger script, a unique masterpiece).

• A "Beta-Testing" Ground: Agencies can use the residency as a controlled environment to nurture new talent or help established artists pivot into new creative directions without the public pressure of a city.

2. Charitable & Funding Bodies: Cultural & Social Impact

Your groups are driven by the health of the "Creative Ecosystem" and regional development.

• Sustainability of the Arts: This project addresses the "Creative Pathology" at its root. Supporting it is a direct intervention in the mental health crisis facing the creative industries.

• Regional Regeneration: By bringing international talent to Northern Spain, the project boosts the local economy, promotes Asturian culture, and creates a sustainable model for rural development (Phase 2 Land Art, Permaculture).

• Knowledge Equity: Charitable bodies can sponsor "scholarship seats," ensuring that the benefits of the residency aren't limited to those with existing wealth, but are accessible to the most deserving talent globally.

3. Wealthy Artists & Mentors: Legacy and "Paying it Forward"

For the successful artist who has "made it," this is an opportunity to build the sanctuary they wish they'd had.

• Cultural Legacy: Supporters are not just funding a building; they are founding a movement. Their name becomes synonymous with a new way of living and creating.

• The Opportunity of "Giving Back": It offers established artists a way to mentor the next generation in a meaningful, immersive environment rather than a one-off masterclass.

• Access to a Peer Sanctuary: Wealthy supporters often need the same "positive aloneness" themselves. By supporting the project, they secure a place in a community of peers where they are seen as fellow creators, not just "celebrities."

4. Philanthropists: Visionary Contribution

Philanthropists often look for "The Big Idea"—something that changes the status quo.

• A New Model for Living: This project is a lighthouse showing an alternative path for the human condition. It can serve as a blueprint for how humans can live and work in the 21st century.

• Intellectual & Spiritual Return: Philanthropists gain the deep satisfaction of knowing they have fostered a "conscious pause" in a world that is moving too fast, too blind, too unconscious. You can be the financiers and guardians of the "inner silence" required for the world's next great ideas to be born.`
  },
  {
    id: "call-to-action",
    title: "call to action and conclusion",
    image: "/images/gallery-nav-10.jpg",
    content: `Call to Action

We are seeking your funding/partnership/promotion to expand the reach and impact of "Path and Passages." Your support will enable us to build and provide this vital service to the creative community. If our mission aligns with your goals and aspirations we would be thrilled to discuss possibilities of collaboration. Please contact us to explore this further.

Conclusion

Imagining ourselves looking back in five to ten years time, we might realise that Path and Passages has become a destination for the international creative community.

It has evolved into an international hub, a well to tap into for inspired resourcing and a vibrant gathering of beautiful souls.

Lives may have changed and masterpieces may have come into existence because of what transpired here and maybe there are also some people who just learned to relax at this place and they kept on coming back.

Now just imagine these are your eyes that are looking back, your funds that made things possible, your voice that spoke up and supported us and your hands that helped build this project - wouldn't that be lovely . . . and doable!`
  },
]

// Width ratios for left and right columns per row - creates the meandering river/path
// Values represent the ratio split of available space (after 49px gap)
const rowWidths = [
  { left: 40, right: 60 },  // Row 1: narrow left
  { left: 58, right: 42 },  // Row 2: wider left  
  { left: 35, right: 65 },  // Row 3: narrow left
  { left: 55, right: 45 },  // Row 4: wider left
  { left: 45, right: 55 },  // Row 5: slightly narrow left
]

// Reusable image button component
function GalleryImage({ 
  item, 
  className, 
  hoveredId, 
  setHoveredId, 
  onClick 
}: { 
  item: typeof galleryItems[0]
  className?: string
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn("relative overflow-hidden group cursor-pointer", className)}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="50vw"
      />
      <div 
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 pt-12 transition-opacity duration-300",
          hoveredId === item.id ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-white text-lg font-normal tracking-widest">
          {item.title}
        </span>
      </div>
    </button>
  )
}

// Simple portal-based modal component
function LightboxModal({ 
  item, 
  onClose 
}: { 
  item: typeof galleryItems[0] | null
  onClose: () => void 
}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [item])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (item) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [item, onClose])

  if (!mounted || !item) return null

  return createPortal(
    <div 
      className="fixed inset-0 z-50 bg-black overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="min-h-screen flex flex-col items-center justify-start pt-16 pb-16 px-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large image with title overlay and X button */}
        <div className="relative w-full max-w-4xl aspect-[16/10] mb-8">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay for title readability */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
          {/* Title positioned on bottom left corner of image */}
          <h2 className="absolute bottom-4 left-4 text-xl md:text-2xl text-white font-light tracking-widest">
            {item.title}
          </h2>
          {/* X button positioned on top right corner of image */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-50 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white/90 hover:text-white transition-all"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content below */}
        <div className="w-full max-w-3xl">
          <ContentRenderer content={item.content} tables={item.tables} />
        </div>
      </div>
    </div>,
    document.body
  )
}

export function GalleryNav() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const openLightbox = (item: typeof galleryItems[0]) => {
    if (!mounted) return
    setSelectedItem(item)
  }

  const closeLightbox = () => {
    if (!mounted) return
    setSelectedItem(null)
  }

  // Listen for custom event from header menu
  useEffect(() => {
    if (!mounted) return
    const handleOpenLightbox = (e: CustomEvent<string>) => {
      const item = galleryItems.find(g => g.id === e.detail)
      if (item) openLightbox(item)
    }
    window.addEventListener("openLightbox" as any, handleOpenLightbox)
    return () => window.removeEventListener("openLightbox" as any, handleOpenLightbox)
  }, [mounted])

  // Filter out project-proposal from gallery display (it's accessed via hero and menu only)
  const displayItems = galleryItems.filter(item => item.id !== "project-proposal")

  return (
    <>
      {/* Desktop: 2 columns, 5 rows, identical row heights, varying widths = meandering river gap */}
      <section className="hidden md:block bg-black">
        <div className="flex flex-col gap-2">
          {/* 5 rows of identical height */}
          {[0, 1, 2, 3, 4].map((rowIndex) => (
            <div key={rowIndex} className="flex h-[350px]" style={{ gap: '49px' }}>
              {/* Left image - calc width to fill edge to edge with 49px gap */}
              <div style={{ width: `calc((100% - 49px) * ${rowWidths[rowIndex].left / 100})` }} className="h-full">
                <GalleryImage 
                  item={displayItems[rowIndex * 2]} 
                  className="w-full h-full"
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onClick={() => openLightbox(displayItems[rowIndex * 2])}
                />
              </div>
              {/* Right image - calc width to fill edge to edge with 49px gap */}
              <div style={{ width: `calc((100% - 49px) * ${rowWidths[rowIndex].right / 100})` }} className="h-full">
                <GalleryImage 
                  item={displayItems[rowIndex * 2 + 1]} 
                  className="w-full h-full"
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onClick={() => openLightbox(displayItems[rowIndex * 2 + 1])}
                />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Mobile: Simple 2-column grid with lightbox - gap controlled by hero mb-1 */}
      <section className="md:hidden bg-black pb-4">
        <div className="grid grid-cols-2 gap-1">
          {displayItems.map((item) => (
            <button
              key={item.id}
              onClick={() => openLightbox(item)}
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-2 pt-8">
                <span className="text-white text-xs font-light tracking-wide">
                  {item.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Modal using React Portal */}
      <LightboxModal item={selectedItem} onClose={closeLightbox} />
    </>
  )
}
