"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const proposalSections = [
  {
    id: "problem-science",
    title: "The Problem - The Science",
    content: `The Problem: Context and Pathology

Today's world presents creatives with significant challenges, amplified by the pressures in the complex force fields of urban environments. The contemporary creative economy demands relentless output, subjecting artists, writers, musicians, and performers to unprecedented levels of pressure. The results often are burnout and creative stagnation.

Existing access to support is limited and often non-aligned with individual needs; hence numerous promising careers stall and sink. We have experienced, researched, and understood the "Creative Pathology" that affects our target group. We are part of it.

The outcome-driven environment of today's marketplace keeps the artist under "Goal-Oriented Pressure" and makes "Creative Flow" elusive. When playfulness, inner silence and the ability to listen are lost, inspiration dries up and creativity shrinks. What used to be a calling starts to feel like a struggle for survival.

The Science: Evidence of Crisis

1. The "Creative Paradox": Scientific literature consistently identifies a "U-shaped" relationship between high creativity and emotional vulnerability.

• Prevalence of Disorders: A landmark study of over 1 million people (S. Kyaga et al. 2012) and subsequent longitudinal follow-ups indicate that creative professionals are 8% to 18% more likely to experience bipolar disorder and depressive episodes compared to the general population.

• The "Openness" Penalty: The personality trait Openness to Experience - essential for artists - is statistically correlated with thin boundaries, meaning creatives absorb environmental stress and emotional stimuli more deeply than the average worker.

• Performance Anxiety (MPA): Studies on Music Performance Anxiety (MPA) show that up to 70% of professional musicians experience anxiety that impairs their physical ability to perform, leading to a cycle of substance use as a "self-medication" strategy.

2. The Burnout Mechanics (2019–2026): Burnout in the creative sector differs from "white-collar" burnout because the artist's identity is inseparable from their output.

• Identity Fusion: When a project fails or a "block" occurs, the creative professional experiences it as an existential threat, not a professional setback. Research calls this "Self-Complexity Deficit."

• The Gig Economy Stressor: A 2022 study on the "Precariat" (precarious proletariat) in the arts found that the lack of financial predictability triggers the Amygdala (the brain's fear center) into a state of chronic activation. This inhibits the Prefrontal Cortex, effectively "shutting down" the ability to think divergently or creatively.

• Digital Exhaustion: Recent studies (2024+) on "Algorithmic Anxiety" show that the pressure to be constantly visible on social media (The "Content Treadmill") has created a new subset of burnout characterised by Creative Mimicry - artists stop innovating and start imitating what the algorithm rewards, leading to a loss of "Artistic Self."

3. Professional Challenges: The "Always-On" Culture - The creative industries have transitioned into a high-speed, high-volume environment that is biologically unsustainable.

4. The Science of "Regeneration" (The Solution): Studies on Attention Restoration Theory (ART) and Environmental Psychology provide the scientific backing for our approach.

• The "Soft Fascination" Effect: Research shows that "Hard Fascination" (screens, city traffic) exhausts the brain. "Soft Fascination" (looking at the Atlantic Ocean, mountain ridge lines in Asturias/Galicia) allows the Default Mode Network (DMN) to engage. The DMN is the brain state where Incubation and creative "Aha!" moments occur.

• Nature and Neural Plasticity: 90 minutes of walking in a natural environment (vs. urban) results in decreased activity in the subgenual Prefrontal Cortex, the area associated with morbid rumination and depression.

• The Power of "Unstructured Time": New research into Cognitive Decoupling suggests that deliberate "Downtime" isn't passive; it's a highly active state where the brain reorganises complex information. Without it, creative "breakthroughs" are statistically less likely.`
  },
  {
    id: "gap-vision",
    title: "The Gap - The Vision",
    content: "While wellness retreats exist, few offer a truly integrated approach that combines scientific understanding with ancient wisdom, set in an environment that itself becomes a teacher. Our vision is to create a sanctuary where transformation is not just possible but inevitable—a place where the mountains, the silence, and the community all work together to support profound personal growth."
  },
  {
    id: "philosophy-model",
    title: "The Philosophy - The Model",
    content: "Path and Passages operates on the principle that true transformation requires three elements: space (physical and mental), guidance (experienced facilitators and proven practices), and time (unhurried immersion). Our model integrates contemplative practices, nature immersion, and evidence-based approaches to create lasting change."
  },
  {
    id: "structures-solutions",
    title: "Structures and Solutions",
    content: `Our retreat structure includes silent morning practices, guided explorations, individual reflection time, and evening community gatherings. We offer various program lengths from weekend intensives to month-long immersions. Each program is carefully designed to meet participants where they are while guiding them toward deeper understanding and practical integration.

Activities that can be offered for support and structure:

• Hikes and Walks
• Swimming and Surfing
• Workshops
• Active Meditations
• Hiking, Running, Physical Education and Training
• Sauna and Sweat Lodge
• Permaculture Gardening and Food Production
• Land Art Projects`
  },
  {
    id: "qualification-experience",
    title: "Qualification and Experience",
    content: "Our founding team brings together decades of experience in contemplative practice, psychology, organizational development, and retreat facilitation. We have guided thousands of individuals and teams through transformative experiences, and our approach has been refined through years of practice and continuous learning."
  },
  {
    id: "unique-points",
    title: "Unique Points and Methods",
    content: "What sets Path and Passages apart is our integration of place, practice, and presence. The northern Spanish landscape is not just a backdrop but an active participant in the retreat experience. Our methods draw from multiple wisdom traditions while remaining grounded in contemporary understanding of how humans change and grow."
  },
  {
    id: "place-environment",
    title: "Place, Environment and Logistics",
    content: "Located in the verdant mountains of northern Spain, our retreat center offers easy access from major European cities while feeling worlds away from urban life. The property includes meditation halls, comfortable accommodation, organic gardens, and miles of walking trails through ancient forests and along mountain ridges."
  },
  {
    id: "financials-growth",
    title: "Financials and Growth Plan",
    content: "Our financial model is built on sustainability and accessibility. We project break-even within 18 months and steady growth thereafter. Revenue streams include individual retreats, corporate programs, facilitator trainings, and partnerships with healthcare and educational institutions. A portion of all profits supports scholarship programs for those who could not otherwise attend."
  },
  {
    id: "marketing-benefits",
    title: "Marketing and Benefits",
    content: "Our marketing approach emphasizes authenticity over promotion. We reach potential participants through partnerships with aligned organizations, word-of-mouth from past guests, and thoughtful content that provides value before asking for commitment. The benefits extend beyond individual participants to their families, workplaces, and communities."
  },
  {
    id: "call-to-action",
    title: "Call to Action and Conclusion",
    content: "We invite you to join us in creating this vision. Whether as an investor, partner, advisor, or early participant, there are many ways to be part of Path and Passages. The world needs more spaces for genuine transformation. Together, we can build one."
  },
]

export function ProposalSections() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id)
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="space-y-4">
          {proposalSections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="border border-border/50 bg-card/50 scroll-mt-20"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-muted/30 transition-colors"
              >
                <h3 className="text-base md:text-lg font-light tracking-wide text-foreground">
                  {section.title}
                </h3>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4",
                    openSection === section.id && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  openSection === section.id ? "max-h-[2000px]" : "max-h-0"
                )}
              >
                <div className="px-5 md:px-6 pb-6 pt-2">
                  <div className="text-muted-foreground leading-relaxed font-light whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
