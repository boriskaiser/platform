<?php declare(strict_types=1);

namespace Shopware\Framework\Event;

use Shopware\Framework\Write\EntityWrittenEvent;

class CrontabWrittenEvent extends EntityWrittenEvent
{
    const NAME = 's_crontab.written';

    public function getName(): string
    {
        return self::NAME;
    }

    public function getEntityName(): string
    {
        return 's_crontab';
    }
}
