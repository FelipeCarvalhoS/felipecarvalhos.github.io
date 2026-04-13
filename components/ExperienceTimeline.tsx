import Experience from './Experience'
import expierences from '@/data/experiences.json'

export default function ExperienceTimeline() {
    return (
        <div>
            {expierences.map(experience => (
                <Experience
                    key={experience.id}
                    isFirst={experience.id === 1}
                    isLast={experience.id === expierences.length}
                    experience={experience}
                />
            ))}
        </div>
    )
}
