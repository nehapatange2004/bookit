import { Link } from "react-router-dom";
import { Experience } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/details/${experience._id}`}>
        <div className="aspect-video overflow-hidden">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{experience.title}</h3>
          <span className="text-xs bg-secondary px-2 py-1 rounded whitespace-nowrap">
            {experience.location}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {experience.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">From </span>
            <span className="font-bold text-lg">₹{experience.price}</span>
          </div>
          <Link to={`/details/${experience._id}`}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ExperienceCard;
