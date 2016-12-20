require "erb"

class ERB
  def self.from_file(file, safe_level=nil, trim_mode=nil, eoutvar='_erbout')
    t = new(File.read(file), safe_level, trim_mode, eoutvar)
    t.filename = file

    t
  end
end

def render_template(template)
  rendered = ERB.from_file(template).result(binding)
  output_name = template.dup.sub!('.erb', '')
  File.open(output_name, 'w') { |file| file.write(rendered) }
end

def walk(folder)
  Dir.foreach(folder) do |file|
    path = File.join(folder, file)
    if file == '.' or file == '..'
      next
    elsif File.directory?(path)
      walk(path)
    elsif file.include? '.erb'
      render_template(path)
    end
  end
end

def isProd
  puts ARGV[0]
  ARGV[0] == "prod"
end

puts isProd
walk(File.expand_path('./app'))
