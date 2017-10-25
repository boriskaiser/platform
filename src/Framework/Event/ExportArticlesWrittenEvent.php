<?php declare(strict_types=1);

namespace Shopware\Framework\Event;

use Shopware\Framework\Write\EntityWrittenEvent;

class ExportArticlesWrittenEvent extends EntityWrittenEvent
{
    const NAME = 's_export_articles.written';

    public function getName(): string
    {
        return self::NAME;
    }

    public function getEntityName(): string
    {
        return 's_export_articles';
    }
}
