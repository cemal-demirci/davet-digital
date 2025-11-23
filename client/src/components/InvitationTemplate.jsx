import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * InvitationTemplate Component
 * Renders a customizable invitation based on template design and custom data
 */
const InvitationTemplate = ({ template, customDesign, eventInfo, onCustomize }) => {
  const [design, setDesign] = useState(customDesign || template?.design || {});

  useEffect(() => {
    setDesign(customDesign || template?.design || {});
  }, [customDesign, template]);

  if (!template) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Şablon yükleniyor...</p>
      </div>
    );
  }

  const { background, textSections = [], imageSections = [], decorations = [] } = design;

  // Build background style
  const getBackgroundStyle = () => {
    if (!background) return {};

    const style = {};

    switch (background.type) {
      case 'solid':
        style.backgroundColor = background.color || '#ffffff';
        break;

      case 'gradient':
        if (background.gradient) {
          const { from, via, to, direction } = background.gradient;
          style.background = via
            ? `linear-gradient(${direction}, ${from}, ${via}, ${to})`
            : `linear-gradient(${direction}, ${from}, ${to})`;
        }
        break;

      case 'image':
        if (background.image) {
          style.backgroundImage = `url(${background.image})`;
          style.backgroundSize = 'cover';
          style.backgroundPosition = 'center';
        }
        break;

      case 'pattern':
        // Add pattern support later
        break;

      default:
        style.backgroundColor = '#ffffff';
    }

    if (background.opacity !== undefined) {
      style.opacity = background.opacity;
    }

    return style;
  };

  // Render text sections
  const renderTextSections = () => {
    return textSections.map((section, index) => {
      // Replace placeholders with actual event info
      let content = section.content || '';

      if (eventInfo) {
        content = content
          .replace('{names}', eventInfo.names || '')
          .replace('{date}', eventInfo.date ? new Date(eventInfo.date).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }) : '')
          .replace('{time}', eventInfo.time || '')
          .replace('{location}', eventInfo.location?.name || '');
      }

      const style = {
        position: 'absolute',
        left: section.position?.x || '50%',
        top: section.position?.y || '50%',
        transform: section.position?.align === 'center' ? 'translate(-50%, -50%)' : 'none',
        textAlign: section.position?.align || 'center',
        fontFamily: section.style?.fontFamily || 'Great Vibes',
        fontSize: `${section.style?.fontSize || 24}px`,
        fontWeight: section.style?.fontWeight || 'normal',
        color: section.style?.color || '#ffffff',
        textShadow: section.style?.textShadow || 'none',
        letterSpacing: section.style?.letterSpacing ? `${section.style.letterSpacing}px` : 'normal',
        lineHeight: section.style?.lineHeight || 1.5,
        whiteSpace: 'pre-wrap',
        maxWidth: '80%'
      };

      return (
        <div
          key={`text-${section.id || index}`}
          style={style}
          className="text-section"
          onClick={() => section.editable && onCustomize && onCustomize('text', section.id, content)}
        >
          {content}
        </div>
      );
    });
  };

  // Render image sections
  const renderImageSections = () => {
    return imageSections.map((section, index) => {
      const style = {
        position: 'absolute',
        left: section.position?.x || '50%',
        top: section.position?.y || '50%',
        width: section.position?.width ? `${section.position.width}px` : 'auto',
        height: section.position?.height ? `${section.position.height}px` : 'auto',
        borderRadius: section.style?.borderRadius ? `${section.style.borderRadius}px` : '0',
        border: section.style?.border || 'none',
        opacity: section.style?.opacity !== undefined ? section.style.opacity : 1,
        filter: section.style?.filter || 'none'
      };

      return (
        <img
          key={`image-${section.id || index}`}
          src={section.url}
          alt={section.type}
          style={style}
          className="image-section"
          onClick={() => section.editable && onCustomize && onCustomize('image', section.id, section.url)}
        />
      );
    });
  };

  // Render decorations
  const renderDecorations = () => {
    return decorations.map((decoration, index) => {
      const style = {
        position: 'absolute',
        left: decoration.position?.x || '50%',
        top: decoration.position?.y || '50%',
        width: decoration.position?.width ? `${decoration.position.width}px` : 'auto',
        height: decoration.position?.height ? `${decoration.position.height}px` : 'auto',
        transform: decoration.position?.rotation ? `rotate(${decoration.position.rotation}deg)` : 'none',
        color: decoration.style?.color || '#ffffff',
        opacity: decoration.style?.opacity !== undefined ? decoration.style.opacity : 1
      };

      return (
        <div
          key={`decoration-${decoration.id || index}`}
          style={style}
          className="decoration"
          dangerouslySetInnerHTML={{ __html: decoration.element }}
        />
      );
    });
  };

  return (
    <div
      className="invitation-container relative overflow-hidden"
      style={{
        width: template.size?.width || 1080,
        height: template.size?.height || 1920,
        ...getBackgroundStyle()
      }}
    >
      {renderImageSections()}
      {renderDecorations()}
      {renderTextSections()}
    </div>
  );
};

InvitationTemplate.propTypes = {
  template: PropTypes.object.isRequired,
  customDesign: PropTypes.object,
  eventInfo: PropTypes.shape({
    eventType: PropTypes.string,
    names: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    time: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
      coordinates: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    }),
    additionalInfo: PropTypes.string
  }),
  onCustomize: PropTypes.func
};

export default InvitationTemplate;
