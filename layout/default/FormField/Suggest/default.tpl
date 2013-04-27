{if $value}
	{foreach $value as $valueItem}
		{$prePopulate[] = $field->getSuggestion($valueItem, $render)}
	{/foreach}
{/if}
<input type="text" class="textinput {$class}" name="{$name}" data-prePopulate="{if !empty($prePopulate)}{$prePopulate|@json_encode|escape}{/if}" data-placeholder="{$placeholder}"/>
