module Jekyll
	module PageLinksFilter
		def pages_link_list(input)
			if input.size > 1 
				last = input.pop
				str = input[0..1].map do |i|
					link_to_item i
				end.join(', ')

				str += " and "
				str += link_to_item last
			else
				link_to_item input[0]
			end
		end

		private

		def link_to_item i
			return "" if i.nil?
			"<a href=\"#{i.url}\">#{i.title.downcase}</a>"
		end
	end
end

Liquid::Template.register_filter(Jekyll::PageLinksFilter)

