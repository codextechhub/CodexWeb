import { TEAM } from "../content";
import { Reveal, SectionHeading } from "../../../components/shared/ui";
import { Icon } from "../../../components/shared/icons";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * The team. Shows founder/leadership cards only when `TEAM.people`
 * in content.ts has entries; the functional team cards always show.
 */
export default function Team() {
  return (
    <section className="section about-team">
      <div className="container">
        <SectionHeading chapter={TEAM.chapter} label={TEAM.label} title={TEAM.title} intro={TEAM.intro} />

        {TEAM.people.length > 0 && (
          <div className="people-grid">
            {TEAM.people.map((person, i) => (
              <Reveal key={person.name} delay={i * 90} className="person-card">
                <div className="person-photo">
                  {person.photo ? (
                    <img src={person.photo} alt={person.name} loading="lazy" />
                  ) : (
                    <span className="person-initials">{initials(person.name)}</span>
                  )}
                </div>
                <div className="person-info">
                  <div>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                  </div>
                  {person.linkedin && (
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`} className="person-link">
                      <Icon name="linkedin" size={18} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <div className="team-grid">
          {TEAM.groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 90} className="team-card">
              <span className="team-icon">
                <Icon name={group.icon} />
              </span>
              <h3>{group.title}</h3>
              <p>{group.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
