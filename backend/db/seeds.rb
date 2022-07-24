# frozen_string_literal: true

seed_models = %i[user post]

all_process_time = Benchmark.realtime do
  seed_models.each do |model|
    puts "-----#{model} start-----"
    puts "count from: #{model.to_s.classify.constantize.count}"
    process_time = Benchmark.realtime do
      require "./db/seeds/#{model}_seeds"
    end
    puts "count to: #{model.to_s.classify.constantize.count}"
    puts "#{format('%.4<time>f', time: process_time)}s"
    puts "-----#{model} end-----"
  end
end
puts "#{format('%.4<time>f', time: all_process_time)}s"
