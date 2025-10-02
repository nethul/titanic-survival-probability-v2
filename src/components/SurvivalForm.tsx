import { useState } from 'react';

interface FormData {
  name: string;
  gender: string;
  age: number;
  ticketClass: number;
  parents: number;
  children: number;
  siblings: number;
  spouse : number;
}

interface SurvivalFormProps {
  onSubmit: (data: FormData) => void;
}

export default function SurvivalForm({ onSubmit }: SurvivalFormProps) {
  const [formData, setFormData] = useState<any>({
    name: '',
    gender: '',
    age: 30,
    ticketClass: 3,
    parents: 0,
    children: 0,
    siblings: 0,
    spouse: 0, // Add spouse as a separate field
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="bg-[#f5ead6] py-20">
      <div className="max-w-4xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[#2a2117] text-lg font-medium mb-3">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c4a8] bg-white/60 focus:border-[#7a6550] focus:outline-none text-[#2a2117]"
              />
            </div>

            <div>
              <label className="block text-[#2a2117] text-lg font-medium mb-3">
                Gender
              </label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#d4c4a8] bg-white/60 focus:border-[#7a6550] focus:outline-none text-[#2a2117] appearance-none cursor-pointer"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[#2a2117] text-lg font-medium mb-3">
                Age
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="w-full h-2 bg-[#b8a58a] rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-3xl font-serif text-[#2a2117] mt-2">{formData.age}</div>
            </div>

            <div>
              <label className="block text-[#2a2117] text-lg font-medium mb-0">
                Which class ticket would you have bought?
              </label>
              <label className='block text-[#616161] text-sm font-extralight mb-4'>
                <label className='text-[#f30000] text-sm font-thin mb-4'>*</label>Historical ticket prices have been converted to approximate modern values for easier understanding.
              </label>
              <div className="flex gap-3">
                {[
                  { value: 1, label: '1st', cost: '$4,591' },
                  { value: 2, label: '2nd', cost: '$1,834' },
                  { value: 3, label: '3rd', cost: '$1,071' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, ticketClass: option.value })}
                    className={`flex-1 py-4 rounded-lg border-2 transition-all ${formData.ticketClass === option.value
                      ? 'bg-[#7a6550] border-[#7a6550] text-white'
                      : 'bg-white/60 border-[#d4c4a8] text-[#2a2117] hover:border-[#7a6550]'
                      }`}
                  >
                    <div className="text-xl font-semibold">{option.label}</div>
                    <div className="text-sm mt-1">{option.cost}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#2a2117] text-lg font-medium mb-3">
              Who would you have cruised with?
            </label>
            <div className="grid grid-cols-4 gap-4 p-6 rounded-lg border-2 border-[#d4c4a8] bg-white/60">
              <div>
                <div className='pb-2'>
                  Spouse
                </div>
                <div className="flex gap-3">
                  {[
                    { value: 1, label: 'Yes' },
                    { value: 0, label: 'No' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, spouse: option.value })}
                      className={`flex-1 py-2 rounded border-2 transition-all ${formData.spouse === option.value
                        ? 'bg-[#7a6550] border-[#7a6550] text-white'
                        : 'bg-white/60 border-[#d4c4a8] text-[#2a2117] hover:border-[#7a6550]'
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className='pb-2'>
                  Parents
                </div>
                <select
                  value={formData.parents}
                  onChange={(e) => setFormData({ ...formData, parents: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded border border-[#d4c4a8] bg-white text-[#2a2117] focus:outline-none focus:border-[#7a6550]"
                >
                  {[...Array(3)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className='pb-2'>
                  Children
                </div>
                <select
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded border border-[#d4c4a8] bg-white text-[#2a2117] focus:outline-none focus:border-[#7a6550]"
                >
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className='pb-2'>
                  Siblings
                </div>
                <select
                  value={formData.siblings}
                  onChange={(e) => setFormData({ ...formData, siblings: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded border border-[#d4c4a8] bg-white text-[#2a2117] focus:outline-none focus:border-[#7a6550]"
                >
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7a6550] hover:bg-[#6b5642] text-white py-5 rounded-lg text-xl font-medium transition-all shadow-lg hover:shadow-xl"
          >
            Will I Survive?
          </button>
        </form>
      </div>
    </section>
  );
}
