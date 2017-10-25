<?php declare(strict_types=1);

namespace Shopware\Framework\Writer\Resource;

use Shopware\Context\Struct\TranslationContext;
use Shopware\Framework\Event\CoreWidgetViewsWrittenEvent;
use Shopware\Framework\Write\Field\IntField;
use Shopware\Framework\Write\Flag\Required;
use Shopware\Framework\Write\WriteResource;

class CoreWidgetViewsWriteResource extends WriteResource
{
    protected const WIDGET_ID_FIELD = 'widgetId';
    protected const AUTH_ID_FIELD = 'authId';
    protected const COLUMN_FIELD = 'column';
    protected const POSITION_FIELD = 'position';

    public function __construct()
    {
        parent::__construct('s_core_widget_views');

        $this->fields[self::WIDGET_ID_FIELD] = (new IntField('widget_id'))->setFlags(new Required());
        $this->fields[self::AUTH_ID_FIELD] = (new IntField('auth_id'))->setFlags(new Required());
        $this->fields[self::COLUMN_FIELD] = (new IntField('column'))->setFlags(new Required());
        $this->fields[self::POSITION_FIELD] = (new IntField('position'))->setFlags(new Required());
    }

    public function getWriteOrder(): array
    {
        return [
            self::class,
        ];
    }

    public static function createWrittenEvent(array $updates, TranslationContext $context, array $rawData = [], array $errors = []): CoreWidgetViewsWrittenEvent
    {
        $event = new CoreWidgetViewsWrittenEvent($updates[self::class] ?? [], $context, $rawData, $errors);

        unset($updates[self::class]);

        /**
         * @var WriteResource
         * @var string[]      $identifiers
         */
        foreach ($updates as $class => $identifiers) {
            if (!array_key_exists($class, $updates) || count($updates[$class]) === 0) {
                continue;
            }

            $event->addEvent($class::createWrittenEvent($updates, $context));
        }

        return $event;
    }
}
